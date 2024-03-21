import * as React from "react";

function SvgComponent({
    title,
    line1,
    line2,
    line3,
    id,
    name,
    university,
    signature,
    leadUniversity,
    date,
    style,
    ...props
}) {
    leadUniversity = leadUniversity || "";
    return (
        <>
            <svg
                viewBox="0 0 2000 1414"
                id="certificate"
                strokeLinecap="square"
                strokeMiterlimit={10}
                xmlnsXlink="http://www.w3.org/1999/xlink"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                    boxShadow: "1px 1px 3px 1px #333",
                    ...style,
                    width: "70%",
                }}
                {...props}
            >
                <style>
                    {`@import url('https://fonts.googleapis.com/css2?family=Karma:wght@300;400;500;600;700&display=swap');`}
                </style>
                <defs>
                    <style>
                        {
                            ".text__cls{-webkit-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;-webkit-tap-highlight-color: transparent;}"
                        }
                    </style>
                </defs>
                <g clipPath="url(#prefix__a)">
                    <g>
                        <image
                            clipPath="url(#prefix__b)"
                            fill="#000"
                            width={2000}
                            height={1414}
                            preserveAspectRatio="none"
                            xlinkHref="/certificate-templates/iwd_blank_certificate.png"
                        />
                    </g>
                </g>
                <text
                    x="50%"
                    y="53%"
                    text-anchor="middle"
                    fill="#2480ef"
                    fontWeight="800"
                    fontFamily="Karma"
                    fontSize="107px"
                    className="text__cls"
                >
                    {name}
                </text>
                <text
                    x="1500"
                    y={"1300"}
                    fill="#4285f4"
                    fontFamily={`'Open Sans'`}
                    fontSize="30px"
                    className="text__cls"
                >
                    Certificate ID:
                    <tspan fontWeight="500" fontFamily="Roboto">
                        {` ${id}`}
                    </tspan>
                </text>
                <text
                    x="1500"
                    y={"1330"}
                    fill="#4285f4"
                    fontFamily={`'Open Sans'`}
                    fontSize="30px"
                    className="text__cls"
                >
                    Date of Issue:
                    <tspan fontWeight="500" fontFamily="Roboto">
                        {` ${date}`}
                    </tspan>
                </text>
                <text
                    x="94"
                    y="1330"
                    fill="#4285f4"
                    fontFamily={`'Open Sans'`}
                    fontSize="20px"
                    className="text__cls"
                >
                    Verify the authenticity of this certificate at:
                    <tspan fontWeight="500" fontFamily="Roboto">
                        {` https://${window.location.host}/c/${id}`}
                    </tspan>
                </text>
            </svg>
        </>
    );
}

export default SvgComponent;
