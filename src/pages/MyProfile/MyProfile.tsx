import LayoutContainer from '../../components/layout/LayoutContainer'
import InnerSideBar from '../../components/UI/InnerSideBar';
import SelectAdress from '../SelectAdress/SelectAdress';


export default function MyProfile() {

    return (
        <LayoutContainer>

            <div className=" p-0 md:p-6 lg:p-6 flex">

                <InnerSideBar />

                <main className="flex-1 ml-6 w-full">

                    {/* <LayoutContainer> */}
                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Name */}
                        <div className="mb-3">  
                            <label className="block text-gray-700 mb-2 text-sm sm:text-base">Name</label>
                            <input
                                type="text"
                                placeholder="Alexa Williams"
                                className="w-full border border-gray-300  px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            />
                        </div>

                        {/* Email */}
                        <div className="mb-3">
                            <label className="block text-gray-700 mb-2 text-sm sm:text-base">Email</label>
                            <input
                                type="email"
                                placeholder="alexa.williams@example.com"
                                className="w-full border border-gray-300  px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            />
                        </div>
                    </div>

                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Phone */}
                        <div className="mb-3">
                            <label className="block text-gray-700 mb-2 text-sm sm:text-base">Phone</label>
                            <input
                                type="tel"
                                placeholder="+1 234 567 890"
                                className="w-full border border-gray-300  px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            />
                        </div>
                    </div>
                    {/* </LayoutContainer> */}


                    <div className='w-full mt-4'>
                        <SelectAdress
                            showItems={false}
                        />

                    </div>


                </main>
            </div>

        </LayoutContainer>
    )
}
