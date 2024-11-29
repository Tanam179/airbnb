'use client';

interface ContainerProps {
    children: React.ReactNode;
}

const Container = ({ children }: ContainerProps) => {
    return (
        <div className="mx-auto px-4 sm:px-2 md:px-10 xl:px-20 max-w-[2360px]">
            { children }
        </div>
    );
};

export default Container;