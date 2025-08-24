import { Pencil } from "lucide-react"
import "react-datepicker/dist/react-datepicker.css";
import TableHeader from "./TableFormHeader";
import TableContent from "./TableContent";



export default function TableUi({ headerName, buttonName, routingPath, arrays }: { headerName: string, buttonName: string, routingPath: string, arrays?: string[] }) {

    return (
        <div className="w-full flex justify-center">
            <div className="w-11/12">

                <TableHeader
                    headerName={headerName}
                    routingPath={routingPath}
                    buttonName={buttonName}
                />

                <TableContent
                    arrays={arrays}
                />

            </div>
        </div>

    )
}
