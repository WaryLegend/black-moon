// export const metadata = {
//   title: "Dashboard",
// };

// export default function Page() {
//   return (
//     <div className="flex items-center justify-between">
//       <h1 className="text-3xl font-semibold">Dashboard</h1>
//     </div>
//   );
// }

import {
  FaDollarSign,
  FaBoxOpen,
  FaUsers,
  FaArrowTrendUp,
} from "react-icons/fa6";
import { MdOutlineShoppingCart } from "react-icons/md";

export const metadata = {
  title: "Dashboard",
};

export default function Page() {
  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <p className="text-primary-600">
          Welcome back! Here&apos;s what&apos;s happening today.
        </p>
      </div>

      {/* 4 Big Stat Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Revenue */}
        <div className="bg-primary-0 rounded-lg border p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-primary-600 text-sm font-medium">
                Total Revenue
              </p>
              <p className="mt-2 text-3xl font-bold">$45,231.89</p>
              <p className="mt-1 flex items-center text-sm text-green-600">
                <FaArrowTrendUp className="mr-1" />
                +20.1% from last month
              </p>
            </div>
            <FaDollarSign className="h-10 w-10 text-green-600 opacity-80" />
          </div>
        </div>

        {/* Orders */}
        <div className="bg-primary-0 rounded-lg border p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-primary-600 text-sm font-medium">Orders</p>
              <p className="mt-2 text-3xl font-bold">+235</p>
              <p className="text-primary-600 mt-1 text-sm">
                +12% from last month
              </p>
            </div>
            <MdOutlineShoppingCart className="h-10 w-10 text-blue-600 opacity-80" />
          </div>
        </div>

        {/* Products Sold */}
        <div className="bg-primary-0 rounded-lg border p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-primary-600 text-sm font-medium">
                Products Sold
              </p>
              <p className="mt-2 text-3xl font-bold">1,892</p>
              <p className="text-primary-600 mt-1 text-sm">+180 today</p>
            </div>
            <FaBoxOpen className="h-10 w-10 text-purple-600 opacity-80" />
          </div>
        </div>

        {/* Active Customers */}
        <div className="bg-primary-0 rounded-lg border p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-primary-600 text-sm font-medium">
                Active Customers
              </p>
              <p className="mt-2 text-3xl font-bold">+573</p>
              <p className="text-primary-600 mt-1 text-sm">+201 this week</p>
            </div>
            <FaUsers className="h-10 w-10 text-orange-600 opacity-80" />
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div>
        <h2 className="mb-4 text-xl font-semibold">Recent Orders</h2>
        <div className="bg-primary-0 overflow-hidden rounded-lg border shadow-sm">
          <table className="w-full table-auto">
            <thead className="bg-primary-50">
              <tr>
                <th className="text-primary-700 px-6 py-4 text-left text-sm font-medium">
                  Order ID
                </th>
                <th className="text-primary-700 px-6 py-4 text-left text-sm font-medium">
                  Customer
                </th>
                <th className="text-primary-700 px-6 py-4 text-left text-sm font-medium">
                  Status
                </th>
                <th className="text-primary-700 px-6 py-4 text-left text-sm font-medium">
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="divide-primary-300 divide-y">
              {[
                {
                  id: "#3210",
                  name: "Liam Johnson",
                  status: "Delivered",
                  total: "$125.00",
                  color: "bg-green-100 text-green-800",
                },
                {
                  id: "#3209",
                  name: "Olivia Smith",
                  status: "Processing",
                  total: "$89.99",
                  color: "bg-yellow-100 text-yellow-800",
                },
                {
                  id: "#3208",
                  name: "Noah Williams",
                  status: "Delivered",
                  total: "$245.50",
                  color: "bg-green-100 text-green-800",
                },
                {
                  id: "#3207",
                  name: "Emma Brown",
                  status: "Delivered",
                  total: "$59.99",
                  color: "bg-green-100 text-green-800",
                },
              ].map((order) => (
                <tr key={order.id} className="hover:bg-primary-50">
                  <td className="px-6 py-4 font-medium">{order.id}</td>
                  <td className="px-6 py-4">{order.name}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${order.color}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium">{order.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
