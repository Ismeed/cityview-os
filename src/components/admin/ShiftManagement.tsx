import { useState } from "react";
import { ERPStore, Shift, Vehicle, Driver } from "./mockData";
import { Plus, Check, Play, UserCheck, Gauge, Wallet, Clock, CheckCircle } from "lucide-react";
import { toast } from "sonner";

interface ShiftManagementProps {
  selectedBranch?: string;
}

export function ShiftManagement({ selectedBranch = "ALL" }: ShiftManagementProps) {
  const branchMap: Record<string, string> = {
    "BR-KT": "Katsina HQ",
    "BR-GB": "Gombe Hub"
  };
  const activeBranchName = branchMap[selectedBranch];

  const [shifts, setShifts] = useState<Shift[]>(ERPStore.getShifts());
  const [vehicles, setVehicles] = useState<Vehicle[]>(ERPStore.getVehicles());
  const [drivers, setDrivers] = useState<Driver[]>(ERPStore.getDrivers());

  // Checkout states
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutData, setCheckoutData] = useState({
    driverId: "",
    vehicleId: "",
    startMileage: 0,
    startTime: "07:30",
    shiftType: "Morning" as "Morning" | "Evening"
  });

  // Checkin states
  const [activeCheckinShift, setActiveCheckinShift] = useState<Shift | null>(null);
  const [checkinData, setCheckinData] = useState({
    endMileage: 0,
    endTime: "18:00",
    actualRemittance: 12000,
    notes: ""
  });

  // Filter available drivers & vehicles by branch
  const availableVehicles = vehicles.filter(v => 
    v.status === "Available" && 
    (activeBranchName ? v.branch === activeBranchName : true)
  );
  // Drivers without an active shift, filtered by branch
  const activeShiftDriverIds = shifts.filter(s => s.status === "In Progress").map(s => s.driverId);
  const availableDrivers = drivers.filter(d => 
    d.status === "Active" && 
    !activeShiftDriverIds.includes(d.id) &&
    (activeBranchName ? d.branch === activeBranchName : true)
  );

  const handleStartShift = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkoutData.driverId || !checkoutData.vehicleId) {
      toast.error("Invalid Selection", { description: "Please select both a driver and a vehicle." });
      return;
    }

    const driver = drivers.find(d => d.id === checkoutData.driverId);
    const vehicle = vehicles.find(v => v.id === checkoutData.vehicleId);

    const newShift: Shift = {
      id: `SH-${Date.now().toString().slice(-4)}`,
      driverId: checkoutData.driverId,
      vehicleId: checkoutData.vehicleId,
      branch: vehicle?.branch || "Katsina HQ",
      shiftType: checkoutData.shiftType,
      startTime: checkoutData.startTime,
      startMileage: Number(checkoutData.startMileage),
      expectedRemittance: driver?.remittanceRate || 12000,
      status: "In Progress",
      date: new Date().toISOString().split("T")[0]
    };

    // Update shift logs
    const updatedShifts = [newShift, ...shifts];
    setShifts(updatedShifts);
    ERPStore.saveShifts(updatedShifts);

    // Update vehicle status
    const updatedVehicles = vehicles.map(v => v.id === checkoutData.vehicleId ? { ...v, status: "On Road" as const, assignedDriverId: checkoutData.driverId } : v);
    setVehicles(updatedVehicles);
    ERPStore.saveVehicles(updatedVehicles);

    ERPStore.addAuditLog(
      "Dispatcher", 
      "Fleet Manager", 
      "Shift Checkout", 
      `Dispatched vehicle ${vehicle?.plateNumber} to driver ${driver?.name}. Start mileage: ${checkoutData.startMileage}.`
    );

    toast.success("Shift Started Successfully", {
      description: `${driver?.name} is on the road with vehicle ${vehicle?.plateNumber}.`
    });

    setCheckoutData({ driverId: "", vehicleId: "", startMileage: 0, startTime: "07:30", shiftType: "Morning" });
    setShowCheckout(false);
  };

  const handleEndShiftSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeCheckinShift) return;

    const isDefaulted = checkinData.actualRemittance < activeCheckinShift.expectedRemittance;
    const finalStatus = isDefaulted ? ("Defaulted" as const) : ("Completed" as const);

    const updatedShifts = shifts.map(s => {
      if (s.id === activeCheckinShift.id) {
        return {
          ...s,
          endTime: checkinData.endTime,
          endMileage: Number(checkinData.endMileage),
          actualRemittance: Number(checkinData.actualRemittance),
          status: finalStatus,
          notes: checkinData.notes
        };
      }
      return s;
    });

    setShifts(updatedShifts);
    ERPStore.saveShifts(updatedShifts);

    // Release vehicle
    const updatedVehicles = vehicles.map(v => {
      if (v.id === activeCheckinShift.vehicleId) {
        return { ...v, status: "Available" as const, assignedDriverId: undefined };
      }
      return v;
    });
    setVehicles(updatedVehicles);
    ERPStore.saveVehicles(updatedVehicles);

    // Record Transaction in Ledger
    const transactions = ERPStore.getTransactions();
    const newTransaction = {
      id: `TR-${Date.now().toString().slice(-4)}`,
      type: "Revenue" as const,
      amount: Number(checkinData.actualRemittance),
      category: "Fleet Remittance" as const,
      description: `Daily remittance for Shift ${activeCheckinShift.id} (${activeCheckinShift.driverId})`,
      branch: activeCheckinShift.branch,
      date: new Date().toISOString().split("T")[0]
    };
    ERPStore.saveTransactions([newTransaction, ...transactions]);

    // Update Driver's HP Contract if applicable
    const hpContracts = ERPStore.getHPContracts();
    const hpUpdated = hpContracts.map(contract => {
      if (contract.driverId === activeCheckinShift.driverId) {
        const newBalance = contract.balancePaid + Number(checkinData.actualRemittance);
        const meetsTarget = Number(checkinData.actualRemittance) >= contract.dailyTarget;
        return {
          ...contract,
          balancePaid: newBalance,
          status: meetsTarget ? ("Active" as const) : ("Missed Remittance" as const),
          paymentHistory: [...contract.paymentHistory, { date: new Date().toISOString().split("T")[0], amount: Number(checkinData.actualRemittance) }]
        };
      }
      return contract;
    });
    ERPStore.saveHPContracts(hpUpdated);

    ERPStore.addAuditLog(
      "Dispatcher", 
      "Fleet Manager", 
      "Shift Checkin", 
      `Checked in shift ${activeCheckinShift.id}. Paid: ₦${checkinData.actualRemittance}. Status: ${finalStatus}.`
    );

    toast.success("Shift Closed Successfully", {
      description: `Remittance logged. Vehicle has been set back to Available status.`
    });

    setActiveCheckinShift(null);
    setCheckinData({ endMileage: 0, endTime: "18:00", actualRemittance: 12000, notes: "" });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <h2 className="font-display text-3xl font-bold text-foreground">Shift operations dashboard</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Dispatch vehicles to drivers, review checkouts, log daily evening remittance returns, and record mileage logs.
          </p>
        </div>
        <button
          onClick={() => {
            setShowCheckout(!showCheckout);
            setActiveCheckinShift(null);
          }}
          className="inline-flex items-center gap-1.5 rounded-xl bg-forest px-4 py-2.5 text-xs font-semibold text-white hover:bg-forest-deep transition shadow-glow-soft cursor-pointer"
        >
          <Play className="h-4 w-4" />
          Morning checkout
        </button>
      </div>

      {/* 1. MORNING CHECKOUT FORM */}
      {showCheckout && (
        <form onSubmit={handleStartShift} className="rounded-3xl border border-border bg-mist/20 p-6 space-y-4 animate-fade-down max-w-3xl">
          <h4 className="font-display font-bold text-base text-foreground flex items-center gap-2">
            <UserCheck className="h-5 w-5 text-forest" />
            Dispatch Vehicle (Start Shift Checkout)
          </h4>

          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Select Driver</label>
              <select
                required
                value={checkoutData.driverId}
                onChange={(e) => {
                  const driver = drivers.find(d => d.id === e.target.value);
                  setCheckoutData(prev => ({ ...prev, driverId: e.target.value }));
                }}
                className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white"
              >
                <option value="">-- Choose Driver --</option>
                {availableDrivers.map(d => (
                  <option key={d.id} value={d.id}>{d.name} ({d.id})</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Select Available Tricycle / Vehicle</label>
              <select
                required
                value={checkoutData.vehicleId}
                onChange={(e) => setCheckoutData(prev => ({ ...prev, vehicleId: e.target.value }))}
                className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white"
              >
                <option value="">-- Choose Vehicle --</option>
                {availableVehicles.map(v => (
                  <option key={v.id} value={v.id}>{v.plateNumber} [{v.type}] ({v.branch})</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Checkout Mileage (km)</label>
              <input
                type="number"
                required
                value={checkoutData.startMileage}
                onChange={(e) => setCheckoutData(prev => ({ ...prev, startMileage: Number(e.target.value) }))}
                placeholder="Current Odometer Reading"
                className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Checkout Time</label>
              <input
                type="time"
                value={checkoutData.startTime}
                onChange={(e) => setCheckoutData(prev => ({ ...prev, startTime: e.target.value }))}
                className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Shift Type</label>
              <select
                value={checkoutData.shiftType}
                onChange={(e) => setCheckoutData(prev => ({ ...prev, shiftType: e.target.value as any }))}
                className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white"
              >
                <option value="Morning">Morning Shift</option>
                <option value="Evening">Evening / Night Shift</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowCheckout(false)}
              className="rounded-full border border-border px-4 py-2 text-xs font-semibold text-muted-foreground hover:bg-white transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-full bg-forest px-5 py-2 text-xs font-semibold text-white hover:bg-forest-deep transition cursor-pointer shadow-glow-soft"
            >
              Confirm Checkout & Release
            </button>
          </div>
        </form>
      )}

      {/* 2. EVENING CHECK-IN FORM */}
      {activeCheckinShift && (
        <form onSubmit={handleEndShiftSubmit} className="rounded-3xl border border-emerald/30 bg-emerald-soft/10 p-6 space-y-4 animate-fade-down max-w-3xl">
          <h4 className="font-display font-bold text-base text-foreground flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-emerald" />
            Receive Vehicle & Record Remittance (Evening Shift Return)
          </h4>

          <div className="p-4 rounded-2xl bg-white border border-border/80 text-xs space-y-1.5 mb-2">
            <div>Shift ID: <span className="font-mono font-bold text-forest">{activeCheckinShift.id}</span></div>
            <div>Driver: <span className="font-semibold text-foreground">{drivers.find(d => d.id === activeCheckinShift.driverId)?.name}</span></div>
            <div>Vehicle: <span className="font-semibold text-foreground">{vehicles.find(v => v.id === activeCheckinShift.vehicleId)?.plateNumber}</span></div>
            <div>Expected Daily Remittance: <span className="font-bold text-forest-deep">₦{activeCheckinShift.expectedRemittance.toLocaleString()}</span></div>
            <div>Checkout Mileage: <span className="font-semibold">{activeCheckinShift.startMileage} km</span></div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Return Odometer Mileage (km)</label>
              <input
                type="number"
                required
                min={activeCheckinShift.startMileage}
                value={checkinData.endMileage || ""}
                onChange={(e) => setCheckinData(prev => ({ ...prev, endMileage: Number(e.target.value) }))}
                placeholder="End mileage odometer"
                className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Actual Remittance Cash Paid (₦)</label>
              <input
                type="number"
                required
                value={checkinData.actualRemittance}
                onChange={(e) => setCheckinData(prev => ({ ...prev, actualRemittance: Number(e.target.value) }))}
                placeholder="Amount Paid in Naira"
                className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Checkin Time</label>
              <input
                type="time"
                value={checkinData.endTime}
                onChange={(e) => setCheckinData(prev => ({ ...prev, endTime: e.target.value }))}
                className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white"
              />
            </div>
          </div>
          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Operational Notes / Issue logs</label>
            <textarea
              value={checkinData.notes}
              onChange={(e) => setCheckinData(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="e.g. Minor scratch on rear guard, engine temp fine, short remittance because..."
              className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white h-20"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setActiveCheckinShift(null)}
              className="rounded-full border border-border px-4 py-2 text-xs font-semibold text-muted-foreground hover:bg-white transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-full bg-forest px-5 py-2 text-xs font-semibold text-white hover:bg-forest-deep transition cursor-pointer shadow-glow-soft"
            >
              Log Return & End Shift
            </button>
          </div>
        </form>
      )}

      {/* 3. ACTIVE AND HISTORICAL SHIFTS LIST */}
      <div className="rounded-3xl border border-border bg-white p-6 shadow-soft space-y-4">
        <div>
          <h4 className="font-display font-bold text-base text-foreground">Active Daily Shifts & Checkout Log</h4>
          <p className="text-[11px] text-muted-foreground">List of drivers currently dispatched or returned today.</p>
        </div>

        <div className="overflow-x-auto border border-border/70 rounded-2xl">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-mist/35 border-b border-border/80 font-bold uppercase text-muted-foreground tracking-wider">
                <th className="p-4">ID</th>
                <th className="p-4">Driver</th>
                <th className="p-4">Vehicle Plate</th>
                <th className="p-4">Branch</th>
                <th className="p-4">Shift Type</th>
                <th className="p-4">Odometer (Out / In)</th>
                <th className="p-4">Timing</th>
                <th className="p-4 text-right">Remittance Expected / Paid</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {shifts
                .filter(s => activeBranchName ? s.branch === activeBranchName : true)
                .map(shift => {
                  const driverObj = drivers.find(d => d.id === shift.driverId);
                const vehicleObj = vehicles.find(v => v.id === shift.vehicleId);
                const isOngoing = shift.status === "In Progress";
                
                return (
                  <tr key={shift.id} className="hover:bg-mist/10 transition">
                    <td className="p-4 font-mono font-bold text-forest">{shift.id}</td>
                    <td className="p-4 font-semibold text-foreground">{driverObj?.name || shift.driverId}</td>
                    <td className="p-4 font-mono text-foreground">{vehicleObj?.plateNumber || shift.vehicleId}</td>
                    <td className="p-4 text-muted-foreground">{shift.branch}</td>
                    <td className="p-4 font-semibold text-forest-deep">{shift.shiftType}</td>
                    <td className="p-4">
                      {shift.startMileage} km &rarr; {shift.endMileage ? `${shift.endMileage} km` : "ON ROAD"}
                      {shift.endMileage && (
                        <span className="block text-[10px] text-muted-foreground">
                          Travelled: {shift.endMileage - shift.startMileage} km
                        </span>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-charcoal">{shift.date}</div>
                      <div className="text-[10px] text-muted-foreground">{shift.startTime} {shift.endTime ? ` - ${shift.endTime}` : "(Active)"}</div>
                    </td>
                    <td className="p-4 text-right font-mono font-bold">
                      <div className="text-muted-foreground text-[10px]">Exp: ₦{shift.expectedRemittance.toLocaleString()}</div>
                      <div className="text-forest-deep">Paid: ₦{shift.actualRemittance ? shift.actualRemittance.toLocaleString() : "—"}</div>
                    </td>
                    <td className="p-4 text-center">
                      <span className={`inline-block rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                        shift.status === "Completed" ? "bg-emerald-soft text-forest-deep" :
                        shift.status === "Defaulted" ? "bg-red-100 text-red-500" :
                        "bg-blue-100 text-blue-600 animate-pulse"
                      }`}>
                        {shift.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      {isOngoing ? (
                        <button
                          onClick={() => {
                            setActiveCheckinShift(shift);
                            setShowCheckout(false);
                            setCheckinData(prev => ({
                              ...prev,
                              actualRemittance: shift.expectedRemittance,
                              endMileage: shift.startMileage + 50 // Mock default
                            }));
                          }}
                          className="rounded bg-emerald-soft text-forest-deep px-3 py-1.5 text-[10px] font-bold hover:bg-emerald hover:text-white transition cursor-pointer"
                        >
                          Check In Return
                        </button>
                      ) : (
                        <span className="text-[10px] text-muted-foreground font-semibold">Closed</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
