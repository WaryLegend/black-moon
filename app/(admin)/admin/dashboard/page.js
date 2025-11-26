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
        <p className="text-gray-600">
          Welcome back! Here&apos;s what&apos;s happening today.
        </p>
      </div>

      {/* 4 Big Stat Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Revenue */}
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
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
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Orders</p>
              <p className="mt-2 text-3xl font-bold">+235</p>
              <p className="mt-1 text-sm text-gray-600">+12% from last month</p>
            </div>
            <MdOutlineShoppingCart className="h-10 w-10 text-blue-600 opacity-80" />
          </div>
        </div>

        {/* Products Sold */}
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Products Sold</p>
              <p className="mt-2 text-3xl font-bold">1,892</p>
              <p className="mt-1 text-sm text-gray-600">+180 today</p>
            </div>
            <FaBoxOpen className="h-10 w-10 text-purple-600 opacity-80" />
          </div>
        </div>

        {/* Active Customers */}
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Active Customers
              </p>
              <p className="mt-2 text-3xl font-bold">+573</p>
              <p className="mt-1 text-sm text-gray-600">+201 this week</p>
            </div>
            <FaUsers className="h-10 w-10 text-orange-600 opacity-80" />
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div>
        <h2 className="mb-4 text-xl font-semibold">Recent Orders</h2>
        <div className="overflow-hidden rounded-lg border bg-white shadow-sm">
          <table className="w-full table-auto">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">
                  Order ID
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">
                  Customer
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
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
                <tr key={order.id} className="hover:bg-gray-50">
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
