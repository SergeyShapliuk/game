import {SVGProps, memo} from "react";

const MagnifierIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={34}
        height={34}
        fill="none"
        {...props}
    >
        <path
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeOpacity={0.55}
            strokeWidth={3.333}
            d="M23.342 23.335 32 32M14.5 9.5v10m-5-5h10m7.5 0C27 21.404 21.404 27 14.5 27S2 21.404 2 14.5 7.596 2 14.5 2 27 7.596 27 14.5Z"
        />
    </svg>
);
const MemoMagnifierIcon = memo(MagnifierIcon);
export default MemoMagnifierIcon;
