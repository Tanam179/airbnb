/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from "react";

const useClickOutside = function (
    step: number,
    setStep: React.Dispatch<React.SetStateAction<number>>,
    handleCloseModal: any
) {
    const modalWindowRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent): void => {
            if (e.target instanceof HTMLElement) {
                if (
                    modalWindowRef?.current &&
                    !modalWindowRef.current.contains(e.target)
                ) {
                    if(step) {
                        if (step === 1) {
                            handleCloseModal?.();
                        } else {
                            setStep(prev => prev - 1);
                        }
                    } else {
                        handleCloseModal?.();
                    }
                }
            }
        };

        // Chỉ thêm sự kiện khi có modal đang mở
        document.addEventListener("click", handleClickOutside, {
            capture: true,
        });

        return () => {
            // Gỡ bỏ sự kiện khi component unmount hoặc khi step thay đổi
            document.removeEventListener("click", handleClickOutside, {
                capture: true,
            });
        };
    }, [handleCloseModal, modalWindowRef, step, setStep]);

    return { modalWindowRef };
};

export default useClickOutside;
