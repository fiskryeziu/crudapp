import { useState } from "react";

export const useHover = () => {
    const [active, setActive] = useState(false);
    const [hover, setHover] = useState(false);


    const hoverEnter = () => {
        setHover(true);
    };

    const hoverLeave = () => {
        setHover(false);
    };
    const activeEnter = () => {
        setActive(true)
    };

    const activeLeave = () => {
        setHover(false);
        setActive(false);
    };

    return {
        active,
        hover,
        hoverEnter,
        hoverLeave,
        activeEnter,
        activeLeave
    }

}