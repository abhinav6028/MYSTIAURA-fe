import { ArrowLeft, Check, Plus } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function TableHeader({ headerName, buttonName, componentType, onButtonClick }: { headerName?: string, routingPath?: string, buttonName?: string, componentType?: string, onButtonClick?: () => void }) {

    const navigate = useNavigate();
    const pathName = useLocation().pathname;

    return (
        <div className="w-full flex justify-between my-4 mt-6 items-center">

            <div className='flex items-center '>
                {
                    componentType == 'toForm' &&
                    <div onClick={() => navigate(-1)} className="p-1 border border-gray-300 rounded-sm cursor-pointer hover:border-gray-500 hover:bg-gray-100 transition">
                        <ArrowLeft className="text-gray-500 hover:text-gray-700" />
                    </div>
                }

                <h1 style={{ fontFamily: 'revert' }} className={`text-[20px] font-semibold ${componentType == 'toForm' && 'ml-3'}`}>
                    {headerName}
                </h1>
            </div>

            <button
                onClick={(e) => {
                    e.preventDefault()
                    if (onButtonClick) onButtonClick();

                    if (pathName?.split('/').length === 3) {
                        navigate(`${pathName}/create`);
                    }
                }}
                type="submit"
                className="text-white cursor-pointer bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none flex items-center"
            >
                {componentType == 'toForm' ? <Check className="mr-2" size={18} /> : <Plus className="mr-2" size={18} />}  {buttonName}
            </button>
        </div>
    )
}
