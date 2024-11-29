import { Fragment } from "react";

const MainContent = ({ title, children }: { title: string; children: React.ReactNode }) => {
    return (
        <Fragment>
            <div className="title mt-2 mb-8">
                <h2 className="text-[22px] font-bold leading-[1.625rem] ">
                    {title}
                </h2>
            </div>
            { children }
        </Fragment>
    );
};

export default MainContent;
