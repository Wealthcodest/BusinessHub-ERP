import BusinessRow from "./BusinessRow";

export default function BusinessTable({

    businesses,
    onDelete,

}) {

    return (

        <div className="overflow-x-auto rounded-xl border bg-white">

            <table className="w-full">

                <thead className="bg-slate-100">

                    <tr>

                        <th className="text-left px-4 py-3">

                            Business

                        </th>

                        <th className="text-left px-4 py-3">

                            Industry

                        </th>

                        <th className="text-left px-4 py-3">

                            Owner

                        </th>

                        <th className="text-left px-4 py-3">

                            Status

                        </th>

                        <th className="text-left px-4 py-3">

                            Created

                        </th>

                        <th className="text-left px-4 py-3">

                            Actions

                        </th>

                    </tr>

                </thead>

                <tbody>

                    {businesses.map((business) => (

                        <BusinessRow

                            key={business.id}

                            business={business}
                            onDelete={onDelete}

                        />

                    ))}

                </tbody>

            </table>

        </div>

    );

}