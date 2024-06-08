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
                viewBox="0 0 1920 1024"
                id="certificate"
                fill="none"
                strokeLinecap="square"
                strokeMiterlimit={10}
                xmlnsXlink="http://www.w3.org/1999/xlink"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                    boxShadow: "1px 1px 3px 1px #333",
                    ...style,
                }}
                {...props}
            >
                <defs>
                    <style>
                        {
                            ".text__cls{-webkit-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;-webkit-tap-highlight-color: transparent;}"
                        }
                    </style>
                </defs>
                <g>
                    <g>
                        <image
                            clipPath="url(#prefix__b)"
                            fill="#000"
                            width={1920}
                            height={1024}
                            preserveAspectRatio="none"
                            xlinkHref="/certificate-templates/top_member.webp"
                        />
                    </g>
                </g>
                <text
                    x="155"
                    y="250"
                    fill="#676c72"
                    fontFamily={`'Open Sans'`}
                    fontSize="30px"
                    className="text__cls"
                >
                    {title || "2020 - 2021 GDSC Core Team Member"}
                </text>
                <text
                    x="150"
                    y="310"
                    fill="#676c72"
                    fontFamily={`'Open Sans'`}
                    fontSize="60px"
                    className="text__cls"
                >
                    Certificate of Appreciation
                </text>
                <text
                    x="155"
                    y="400"
                    fill="orange"
                    fontWeight="500"
                    fontFamily="Roboto"
                    fontSize="77px"
                    className="text__cls"
                >
                    {name}
                </text>
                <text
                    fill="#5f6368"
                    fontFamily={`'Open Sans'`}
                    fontSize="36px"
                    className="text__cls"
                >
                    {line1.split("\n").map((str, index, array) => (
                        <tspan
                            key={index}
                            x="155"
                            y={470 + index * 40} // Center vertically based on the number of lines
                        >
                            {str}
                        </tspan>
                    ))}
                </text>
                <text
                    x="160"
                    y={810 - (14 * leadUniversity.split("\n").length) / 2}
                    fill="#da3936"
                    fontFamily={`'Dancing Script'`}
                    fontSize="80px"
                    className="text__cls"
                >
                    {signature}
                </text>
                <text
                    fill="#676c72"
                    fontFamily={`'Open Sans'`}
                    fontSize="34px"
                    className="text__cls"
                >
                    {leadUniversity.split("\n").map((str, index, array) => (
                        <tspan
                            key={index}
                            x="160"
                            y={850 + (index - (array.length - 1) / 2) * 14} // Center vertically based on the number of lines
                            dominantBaseline="middle" // Center the text vertically
                            // textAnchor="middle"  // Center the text horizontally
                        >
                            {str}
                        </tspan>
                    ))}
                </text>
                <text
                    x="330"
                    y="894"
                    fill="#676c72"
                    fontFamily={`'Open Sans'`}
                    fontSize="22px"
                    className="text__cls"
                >
                    <tspan fontWeight="800" fontFamily="Roboto">
                        {` ${date}`}
                    </tspan>
                </text>
                <text
                    x="20"
                    y="1000"
                    fill="#676c72"
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
