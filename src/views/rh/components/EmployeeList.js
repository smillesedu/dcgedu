import { EmployeeCard } from "./EmployeeCard";

export function EmployeeList({ employees }: { employees: any[] }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Lista de Funcionários</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {employees.map((emp) => (
          <EmployeeCard key={emp.id} employee={emp} />
        ))}
      </div>
    </div>
  );
}
