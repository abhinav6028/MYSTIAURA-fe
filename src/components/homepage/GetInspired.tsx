import { FONT_FAMILY } from "../../utils";

const GetInspired = () => {
    return (
        <div className="py-10">
            <h1 style={{ fontFamily: FONT_FAMILY, scrollbarWidth: "none" }} className="text-3xl mb-5">Get Inspired</h1>
            <div className="overflow-x-auto whitespace-nowrap space-x-4 py-2">

                <img
                    src="https://plus.unsplash.com/premium_photo-1674498704110-e03bdfa72e76?q=80&w=699&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt=""
                    className="inline-block h-120 w-90 object-cover"
                />


                <img
                    src="https://plus.unsplash.com/premium_photo-1674255466849-b23fc5f5d3eb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDQ0fHx8ZW58MHx8fHx8"
                    alt=""
                    className="inline-block h-120 w-90 object-cover"
                />

                <img
                    src="https://plus.unsplash.com/premium_photo-1740020264730-eb66ebc96627?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEwfHx8ZW58MHx8fHx8"
                    alt=""
                    className="inline-block h-120 w-90 object-cover"
                />

                <img
                    src="https://plus.unsplash.com/premium_photo-1669835163351-785a187cdf95?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDIxfHx8ZW58MHx8fHx8"
                    alt=""
                    className="inline-block h-120 w-90 object-cover"
                />

                <img
                    src="https://plus.unsplash.com/premium_photo-1740020266177-d4cae0fd36b0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDM3fHx8ZW58MHx8fHx8"
                    alt=""
                    className="inline-block h-120 w-90 object-cover"
                />
                <img
                    src="https://plus.unsplash.com/premium_photo-1728515809787-7dbf4c63ddc9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDZ8fHxlbnwwfHx8fHw%3D"
                    alt=""
                    className="inline-block h-120 w-90 object-cover"
                />

            </div>

            <style>{`
    /* Hide scrollbar for Webkit browsers (Chrome, Safari) */
    div::-webkit-scrollbar {
      display: none;
    }
  `}</style>
        </div>
    )
}

export default GetInspired