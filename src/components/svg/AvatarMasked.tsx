import * as React from "react";
import {SVGProps, memo} from "react";


type AvatarMaskedProps = SVGProps<SVGSVGElement> & {
    image: string
}

const AvatarMasked: React.FC<AvatarMaskedProps> = ({image, ...props}) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 64 78"
        {...props}
    >
        <defs>
            <clipPath id="clippath">
                <path
                    d="M59 0H5.4l-.2 35C3.8 38.4 3 42.1 3 45.9c0 16 13 29 29 29s29-13 29-29-.8-7.6-2.2-10.9L59 0Z"
                    className="cls-2"
                />
            </clipPath>
            <style>{".cls-2{fill:none}"}</style>
            <mask
                id="mask"
                width={92}
                height={130}
                x={-18}
                y={0}
                maskUnits="userSpaceOnUse"
            >
                <path
                    id="mask0_95_117"
                    d="M3 0h58v46c0 16-13 29-29 29S3 62 3 46V0Z"
                    style={{
                        fill: "#d9d9d9"
                    }}
                />
            </mask>
        </defs>
        <g id="Layer_1">
            <circle
                cx={32}
                cy={46}
                r={30.5}
                style={{
                    fill: "#131439",
                    stroke: "#6ca2ff",
                    strokeWidth: 3
                }}
            />
            <path
                d="M-18 0h92v130h-92z"
                className="cls-2"
                style={{
                    mask: "url(#mask)"
                }}
            />
            <image
                xlinkHref={image}
                width={238}
                height={336}
                style={{
                    clipPath: `url(#clippath)`
                }}
                transform="matrix(.38 0 0 .38 -14.4 -.6)"
            />
        </g>
    </svg>
);
const MemoAvatarMasked = memo(AvatarMasked);
export default MemoAvatarMasked;
