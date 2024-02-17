import HomeContainer from "@/components/ui/HomeContainer";

const Homepage = () => {
    return ( 
        <>
            {/* <div className="grid grid-cols-6 gap-4"> */}
            <div className="flex flex-row w-full gap-4">
                
                {/* First column */}
               
                <aside className="w-1/6 p-3">
                    Designers
                    <div>Rick Ownes</div>
                    <div>Celine</div>
                    <div>Prada</div>
                    <div>Cristian Dior</div>
                </aside>

                {/* Second column */}
                <div className="w-full grid grid-cols-4 gap-4 items-center text-center justify-center">
                    <p>Content</p>
                    <p>Content</p>
                    <p>Content</p>
                    <p>Content</p>
                    <p>Content</p>
                    <p>Content</p>
                    <p>Content</p>
                    <p>Content</p>
                    <p>Content</p>
                    <p>Content</p>
                    <p>Content</p>
                    <p>Content</p>
                </div>

                {/* Third column */}

                <aside className="w-1/6 text-right p-3">
                    Sellers
                    <div>Aviva</div>
                    <div>Sausage</div>
                    <div>Brenda</div>
                    <div>A$ap Rocky</div>
                </aside>
            </div>
        </>
     );
}
 
export default Homepage;
