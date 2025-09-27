import LayoutContainer from '../../components/layout/LayoutContainer'
import InnerSideBar from '../../components/UI/InnerSideBar';
import SelectAdress from '../SelectAdress/SelectAdress';


export default function MyProfile() {

    return (
        <LayoutContainer>

            <div className="min-h-scree p-6 flex">

                <InnerSideBar />

                <main className="flex-1 ml-6 w-full">

                    <LayoutContainer>

                        <div className="w-full grid grid-cols-2 gap-4">
                            <div className="mb-3">
                                <label className="block text-gray-700 mb-2">Name</label>
                                <input
                                    type="email"
                                    placeholder="alexa.williams@example.com"
                                    className="w-full border px-4 py-2 focus:outline-none focus:ring-0"
                                />
                            </div>

                            <div className="mb-3">
                                <label className="block text-gray-700 mb-2">Email</label>
                                <input
                                    type="email"
                                    placeholder="alexa.williams@example.com"
                                    className="w-full border px-4 py-2 focus:outline-none focus:ring-0"
                                />
                            </div>
                        </div>

                        <div className="w-full grid grid-cols-2 gap-4">
                            <div className="mb-3">
                                <label className="block text-gray-700 mb-2">Phone</label>
                                <input
                                    type="email"
                                    placeholder="alexa.williams@example.com"
                                    className="w-full border px-4 py-2 focus:outline-none focus:ring-0"
                                />
                            </div>


                        </div>




                    </LayoutContainer>


                    <div className='w-full mt-4'>
                        <SelectAdress
                            showItems={true}
                        />

                    </div>


                </main>
            </div>

        </LayoutContainer>
    )
}
