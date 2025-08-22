import { Pencil, Plus, Trash } from "lucide-react"

<Pencil />

export default function TableUi() {
    return (
        <div className="w-full flex justify-center">
            <div className="w-11/12">
                <div className="w-full flex justify-between my-4 mt-8 items-center">
                    <h1 className="text-[30px]">Products</h1>
                    <button type="button" className="text-white cursor-pointer bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none flex items-center dark:focus:ring-blue-800">
                        Create Product <Plus className="ml-2" />
                    </button>
                </div>

                <div className="relative shadow-md sm:rounded-lg overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 border-collapse">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
                            <tr>
                                <th className="px-6 py-8 text-[13px] font-roboto">Product name</th>
                                <th className="px-6 py-8 text-[13px] font-roboto">Product name</th>
                                <th className="px-6 py-8 text-[13px] font-roboto">Color</th>
                                <th className="px-6 py-8 text-[13px] font-roboto">Category</th>
                                <th className="px-6 py-8 text-[13px] font-roboto">Accessories</th>
                                <th className="px-6 py-8 text-[13px] font-roboto">Available</th>
                                <th className="px-6 py-8 text-[13px] font-roboto">Price</th>
                                <th className="px-6 py-8 text-[13px] font-roboto">Weight</th>
                                <th className="px-6 py-8 text-[13px] font-roboto">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 1].map((data, index) => (
                                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">Apple MacBook Pro 17"</th>
                                    <th className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">Apple MacBook Pro 17"</th>
                                    <td className="px-6 py-4">Silver</td>
                                    <td className="px-6 py-4">Laptop</td>
                                    <td className="px-6 py-4">Yes</td>
                                    <td className="px-6 py-4">Yes</td>
                                    <td className="px-6 py-4">$2999</td>
                                    <td className="px-6 py-4">3.0 lb.</td>
                                    <td className="flex items-center px-6 py-4 gap-3">
                                        <Pencil size={18} className="cursor-pointer" />
                                        <Trash size={18} className="cursor-pointer" />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    )
}
