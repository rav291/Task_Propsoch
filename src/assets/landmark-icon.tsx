import { IconSvgProps } from "@/types/types"

export const LandmarkIcon: React.FC<IconSvgProps> = ({
  size,
  width = 48,
  height = 49,
  fill = "url(#paint0_linear_4_16287)",
  ...props
}) => (
  <svg width="32" height="40" viewBox="0 0 32 40" fill="none" {...props}>
    <path
      d="M16.0066 0.349854C24.3451 0.349854 31.1185 7.1233 31.1185 15.4765C31.1185 22.5805 23.5913 33.2232 17.2911 38.6497C16.5887 39.2547 15.5557 39.2406 14.853 38.6359C7.036 31.9089 0.878906 22.7938 0.878906 15.4765C0.878906 7.1232 7.6523 0.349854 16.0066 0.349854ZM23.3547 15.166C23.3547 11.1043 20.0613 7.8109 15.9987 7.8109C11.936 7.8109 8.6437 11.1043 8.6437 15.166C8.6437 19.2286 11.936 22.522 15.9987 22.522C20.0614 22.522 23.3547 19.2286 23.3547 15.166Z"
      fill={fill}
    />
    <defs>
      <linearGradient
        id="paint0_linear_4_16287"
        x1="15.9987"
        y1="0.349854"
        x2="15.9987"
        y2="39.6501"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FD915C" />
        <stop offset="1" stopColor="#E95318" />
      </linearGradient>
    </defs>
  </svg>
)
