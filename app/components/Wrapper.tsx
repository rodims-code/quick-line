import Navbar from "./Navba";


type WrapperProps = {
    children: React.ReactNode;
};

const Wrapper = ({ children }: WrapperProps) => {
    return (

        <>
            <Navbar />
            <div className="px-5 md:px-[10%] mt-8 mb-10">
                {children}
            </div>
        </>

    );
};

export default Wrapper;