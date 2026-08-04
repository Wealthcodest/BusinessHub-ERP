import Button from "@/components/ui/Button";
import BusinessSearch from "./BusinessSearch";

export default function BusinessToolbar({

    search,

    setSearch,

    onCreate,

}) {

    return (

        <div className="flex items-center justify-between mb-6">

            <BusinessSearch

                value={search}

                onChange={setSearch}

            />

            <Button

                onClick={onCreate}

            >

                + New Business

            </Button>

        </div>

    );

}