import { IconSvgProps } from "@/types/types"

export const ShareIcon: React.FC<IconSvgProps> = ({
  size,
  width = 48,
  height = 48,
  color = "#292D32",
  ...props
}) => (
  <svg width={width} height={height} viewBox="0 0 49 48" fill="none" {...props}>
    <path
      d="M19.4436 26.265L29.6886 32.235M29.6736 15.765L19.4436 21.735M38.0586 13.5C38.0586 15.9853 36.0439 18 33.5586 18C31.0733 18 29.0586 15.9853 29.0586 13.5C29.0586 11.0147 31.0733 9 33.5586 9C36.0439 9 38.0586 11.0147 38.0586 13.5ZM20.0586 24C20.0586 26.4853 18.0439 28.5 15.5586 28.5C13.0733 28.5 11.0586 26.4853 11.0586 24C11.0586 21.5147 13.0733 19.5 15.5586 19.5C18.0439 19.5 20.0586 21.5147 20.0586 24ZM38.0586 34.5C38.0586 36.9853 36.0439 39 33.5586 39C31.0733 39 29.0586 36.9853 29.0586 34.5C29.0586 32.0147 31.0733 30 33.5586 30C36.0439 30 38.0586 32.0147 38.0586 34.5Z"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export const CallIcon: React.FC<IconSvgProps> = ({
  size,
  width = 48,
  height = 48,
  color = "292D32",
  ...props
}) => (
  <svg width={width} height={height} viewBox="0 0 49 48" fill="none" {...props}>
    <path
      d="M30.4453 7.5C32.9896 8.18283 35.3095 9.52285 37.1722 11.3856C39.035 13.2483 40.375 15.5682 41.0578 18.1125"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M28.8906 13.2939C30.4208 13.7003 31.8164 14.504 32.936 15.6235C34.0555 16.7431 34.8592 18.1387 35.2656 19.6689"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M17.9023 23.3996C19.4459 26.5871 22.0234 29.158 25.2148 30.6933C25.4503 30.8048 25.7106 30.853 25.9704 30.8333C26.2301 30.8136 26.4802 30.7266 26.6961 30.5808L31.3836 27.4496C31.5907 27.3091 31.83 27.2234 32.0792 27.2004C32.3284 27.1775 32.5793 27.218 32.8086 27.3183L41.5836 31.0871C41.8835 31.2119 42.1341 31.4318 42.2967 31.713C42.4593 31.9942 42.525 32.3211 42.4836 32.6433C42.2055 34.8141 41.1459 36.8091 39.5032 38.2551C37.8604 39.7012 35.7471 40.4991 33.5586 40.4996C26.7956 40.4996 20.3095 37.813 15.5274 33.0308C10.7452 28.2486 8.05859 21.7626 8.05859 14.9996C8.05909 12.8111 8.857 10.6977 10.303 9.05499C11.749 7.41225 13.7441 6.35269 15.9148 6.07457C16.237 6.03318 16.5639 6.09886 16.8451 6.26149C17.1263 6.42411 17.3463 6.67467 17.4711 6.97457L21.2398 15.7683C21.3378 15.994 21.3788 16.2403 21.3592 16.4855C21.3396 16.7307 21.26 16.9674 21.1273 17.1746L17.9961 21.9371C17.8567 22.1525 17.7749 22.4 17.7585 22.6561C17.742 22.9121 17.7916 23.1681 17.9023 23.3996Z"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export const RightArrowIcon: React.FC<IconSvgProps> = ({
  size,
  width = 48,
  height = 48,
  color = "#292D32",
  ...props
}) => (
  <svg
    width={size || width}
    height={size || height}
    viewBox="0 0 49 48"
    fill="none"
    {...props}
  >
    <path
      d="M42.1562 24H5.84375"
      stroke={color}
      strokeWidth="4"
      strokeLinecap="round"
    />
    <path
      d="M26.1992 41.3861L41.1164 26.4689C41.4423 26.1458 41.701 25.7613 41.8774 25.3373C42.0542 24.9136 42.1449 24.4593 42.1449 24.0001C42.1449 23.541 42.0542 23.0867 41.8774 22.6629C41.701 22.239 41.4423 21.8545 41.1164 21.5316L26.1992 6.61426"
      stroke={color}
      strokeWidth="4"
      strokeLinecap="round"
    />
  </svg>
)

export const LeftArrowIcon: React.FC<IconSvgProps> = ({
  size,
  width = 48,
  height = 48,
  color = "#292D32",
  ...props
}) => (
  <svg
    width={size || width}
    height={size || height}
    viewBox="0 0 49 48"
    fill="none"
    {...props}
  >
    <path
      d="M42 24H5.6875"
      stroke={color}
      strokeWidth="4"
      strokeLinecap="round"
    />
    <path
      d="M21.6332 41.3861L6.71606 26.4689C6.39015 26.1458 6.13143 25.7613 5.95508 25.3373C5.77829 24.9136 5.6875 24.4593 5.6875 24.0001C5.6875 23.541 5.77829 23.0867 5.95508 22.6629C6.13143 22.239 6.39015 21.8545 6.71606 21.5316L21.6332 6.61426"
      stroke={color}
      strokeWidth="4"
      strokeLinecap="round"
    />
  </svg>
)

export const DownArrowIcon: React.FC<IconSvgProps> = ({
  size,
  width = 48,
  height = 48,
  color = "#292D32",
  ...props
}) => (
  <svg width={width} height={height} viewBox="0 0 49 48" fill="none" {...props}>
    <path
      d="M24 10L24 39"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M33.3857 31.0543C28.9995 35.1875 26.4685 37.9714 26.4685 37.9714C26.1454 38.2974 25.7609 38.5561 25.3369 38.7324C24.9132 38.9092 24.4589 39 23.9997 39C23.5406 39 23.0863 38.9092 22.6625 38.7324C22.2386 38.5561 21.5312 37.9714 21.5312 37.9714L14.6138 31.0543"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
)

export const UpArrowIcon: React.FC<IconSvgProps> = ({
  size,
  width = 48,
  height = 48,
  color = "#292D32",
  strokeWidth = 2,
  ...props
}) => (
  <svg width={width} height={height} viewBox="0 0 49 48" fill="none" {...props}>
    <path
      d="M23.9995 39L23.9995 10"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
    <path
      d="M14.6139 17.9457C19 13.8125 21.5311 11.0286 21.5311 11.0286C21.8542 10.7026 22.2387 10.4439 22.6627 10.2676C23.0864 10.0908 23.5407 10 23.9999 10C24.459 10 24.9133 10.0908 25.3371 10.2676C25.761 10.4439 26.4684 11.0286 26.4684 11.0286L33.3857 17.9457"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
  </svg>
)

export const UpChevronIcon: React.FC<IconSvgProps> = ({
  size,
  width = 48,
  height = 48,
  color = "#292D32",
  strokeWidth = 2,
  ...props
}) => (
  <svg width={width} height={height} viewBox="0 0 49 48" fill="none" {...props}>
    <path
      d="M14.6139 27.9457C19 23.8125 21.5311 21.0286 21.5311 21.0286C21.8542 20.7026 22.2387 20.4439 22.6627 20.2676C23.0864 20.0908 23.5407 20 23.9999 20C24.459 20 24.9133 20.0908 25.3371 20.2676C25.761 20.4439 26.4684 21.0286 26.4684 21.0286L33.3857 27.9457"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
  </svg>
)

export const FilterIcon: React.FC<IconSvgProps> = ({
  size,
  width = 48,
  height = 48,
  color = "#292D32",
  strokeWidth,
  ...props
}) => (
  <svg width={width} height={height} viewBox="0 0 49 48" fill="none" {...props}>
    <path
      d="M8 13.2598H41.8476"
      stroke={color}
      strokeWidth={strokeWidth ?? 2}
      strokeLinecap="round"
    />
    <path
      d="M8 24H42"
      stroke={color}
      strokeWidth={strokeWidth ?? 2}
      strokeLinecap="round"
    />
    <path
      d="M8 36H42"
      stroke={color}
      strokeWidth={strokeWidth ?? 2}
      strokeLinecap="round"
    />
    <circle
      cx="16.5"
      cy="36"
      r="4.5"
      fill="white"
      stroke={color}
      strokeWidth={strokeWidth ?? 2}
    />
    <circle
      cx="16.5"
      cy="13.25"
      r="4.5"
      fill="white"
      stroke={color}
      strokeWidth={strokeWidth ?? 2}
    />
    <circle
      cx="32.5"
      cy="24"
      r="4.5"
      fill="white"
      stroke={color}
      strokeWidth={strokeWidth ?? 2}
    />
  </svg>
)

export const CalendarIcon: React.FC<IconSvgProps> = ({
  size,
  width = 48,
  height = 48,
  color = "#292D32",
  ...props
}) => (
  <svg width={width} height={height} viewBox="0 0 49 48" fill="none" {...props}>
    <path
      d="M41.1033 15.2661L35.4866 37.8162C35.0866 39.4995 33.5866 40.6661 31.8533 40.6661H9.95328C7.43661 40.6661 5.63664 38.1993 6.38664 35.7827L13.4033 13.2495C13.8866 11.6828 15.3366 10.5994 16.97 10.5994H37.47C39.0533 10.5994 40.37 11.566 40.92 12.8994C41.2366 13.616 41.3033 14.4328 41.1033 15.2661Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M31.2266 40.6667H39.1932C41.3432 40.6667 43.0265 38.85 42.8765 36.7L41.2266 14"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20.6875 14.6335L22.4208 7.43359"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M31.8594 14.6492L33.426 7.41602"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M17.3867 24H30.7201"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15.7227 30.667H29.056"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export const SortIcon: React.FC<IconSvgProps> = ({
  size,
  width = 48,
  height = 48,
  ...props
}) => (
  <svg width={width} height={height} viewBox="0 0 49 48" fill="none" {...props}>
    <path
      d="M15 34L15 6"
      stroke="#292D32"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M33 13L33 42"
      stroke="#292D32"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M5.61385 13.6332C10 9.5 12.5311 6.71606 12.5311 6.71606C12.8542 6.39015 13.2387 6.13143 13.6627 5.95508C14.0864 5.77829 14.5407 5.6875 14.9999 5.6875C15.459 5.6875 15.9133 5.77829 16.3371 5.95508C16.761 6.13143 17.4684 6.71606 17.4684 6.71606L24.3857 13.6332"
      stroke="#292D32"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M42.3857 34.0543C37.9995 38.1875 35.4685 40.9714 35.4685 40.9714C35.1454 41.2974 34.7609 41.5561 34.3369 41.7324C33.9132 41.9092 33.4589 42 32.9997 42C32.5406 42 32.0863 41.9092 31.6625 41.7324C31.2386 41.5561 30.5312 40.9714 30.5312 40.9714L23.6138 34.0543"
      stroke="#292D32"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
)

export const SearchIcon: React.FC<IconSvgProps> = ({
  size,
  width = 48,
  height = 48,
  color = "#292D32",
  ...props
}) => (
  <svg width={width} height={height} viewBox="0 0 49 48" fill="none" {...props}>
    <path
      d="M19.5 28C25.2989 28 30 23.299 30 17.5C30 11.701 25.2989 7 19.5 7C13.701 7 9 11.701 9 17.5C9 23.299 13.701 28 19.5 28Z"
      stroke={color}
      strokeWidth="3"
    />
    <path
      d="M39.9999 41C40.5857 41.5858 41.5354 41.5858 42.1212 41C42.707 40.4142 42.707 39.4645 42.1212 38.8787L39.9999 41ZM25.9999 27L39.9999 41L42.1212 38.8787L28.1212 24.8787L25.9999 27Z"
      stroke={color}
    />
  </svg>
)

export const HamburgerIcon: React.FC<IconSvgProps> = ({
  size,
  width = 24,
  height = 24,
  color = "#292D32",
  ...props
}) => (
  <svg width={width} height={height} viewBox="0 0 49 48" fill="none" {...props}>
    <path
      d="M8 13.2598H41.8476"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path d="M8 24H42" stroke={color} strokeWidth="3" strokeLinecap="round" />
    <path d="M8 36H42" stroke={color} strokeWidth="3" strokeLinecap="round" />
  </svg>
)

export const ListStarColored: React.FC<IconSvgProps> = ({
  size = 12,
  width,
  height,
  ...props
}) => (
  <svg
    width={size || width}
    height={size || height}
    viewBox="0 0 12 13"
    fill="none"
    {...props}
  >
    <path
      clipRule="evenodd"
      d="M11.996 6.50087C11.996 6.831 11.7294 7.0987 11.3999 7.10043H11.3958C11.0321 7.10043 10.6633 7.14264 10.2938 7.22995C9.1895 7.4907 8.265 8.11339 7.61686 8.94307C6.97856 9.75946 6.60795 10.7765 6.59639 11.8449C6.59639 11.853 6.59639 11.8611 6.59639 11.8692V11.8727V11.8767C6.59697 11.8848 6.59697 11.8923 6.59697 11.8999C6.59697 11.9074 6.59697 11.9149 6.59639 11.9224V11.9241C6.59639 11.9265 6.59639 11.9305 6.59639 11.9305C6.5802 12.2473 6.31829 12.4994 5.9974 12.4994C5.83146 12.4994 5.68172 12.4324 5.57302 12.3237C5.47357 12.2242 5.40882 12.0895 5.39899 11.9397C5.39783 11.9265 5.39725 11.9132 5.39725 11.8999C5.39725 11.8866 5.39783 11.8738 5.39899 11.8605V11.8588C5.39552 11.509 5.35331 11.1534 5.27006 10.7984C5.0093 9.69412 4.38661 8.76962 3.55693 8.12149C2.72725 7.47336 1.69116 7.10101 0.603614 7.10101H0.599566C0.43363 7.10101 0.283883 7.03394 0.175765 6.92525C0.0670682 6.81655 0 6.66623 0 6.50087C0 6.33551 0.0670682 6.18518 0.175765 6.07707C0.284462 5.96837 0.434209 5.9013 0.599566 5.9013C1.94324 5.9013 3.15741 5.34914 4.02814 4.45991C4.87112 3.59901 5.39263 2.42243 5.39783 1.12385V1.12154C5.39783 1.11518 5.39725 1.10882 5.39725 1.10246V1.09957C5.39725 1.09263 5.39725 1.08569 5.39783 1.07817V1.07702C5.40361 0.920911 5.46953 0.779258 5.57302 0.675765C5.68172 0.567068 5.83204 0.5 5.9974 0.5C6.16276 0.5 6.31308 0.567068 6.4212 0.675765C6.5299 0.784462 6.59697 0.934209 6.59697 1.09957V1.10246C6.59697 2.40855 7.11906 3.59265 7.9655 4.45818C7.97764 4.4709 7.98979 4.48304 8.00251 4.49576C8.87092 5.36418 10.0706 5.9013 11.3958 5.9013C11.5612 5.9013 11.7115 5.96837 11.8196 6.07707C11.9289 6.18518 11.996 6.33551 11.996 6.50087Z"
      fill="#FF6D33"
      fillRule="evenodd"
    />
  </svg>
)

export const CircleIcon: React.FC<IconSvgProps> = ({
  size = 12,
  width,
  height,
  color = "#292D32",
  ...props
}) => (
  <svg
    width={size || width}
    height={size || height}
    viewBox="0 0 48 48"
    fill="none"
    {...props}
  >
    <circle cx="24" cy="24" r="18" fill={color} />
  </svg>
)

export const CheckIcon: React.FC<IconSvgProps> = ({
  size = 12,
  width,
  height,
  color = "#FFFFFF",
  strokeWidth = "3",
  ...props
}) => (
  <svg
    width={size || width}
    height={size || height}
    viewBox="0 0 48 48"
    fill="none"
    {...props}
  >
    <path
      d="M15 25.776L18.3154 29.8011C19.6249 31.3913 21.9505 31.401 23.2718 29.8217L34 17"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
  </svg>
)

export const InstagramIcon: React.FC<IconSvgProps> = ({
  size = 12,
  width,
  height,
  color = "#FFFFFF",
  ...props
}) => (
  <svg
    width={size || width}
    height={size || height}
    viewBox="0 0 48 48"
    fill="none"
    {...props}
  >
    <path
      d="M38 6H10C7.79086 6 6 7.79086 6 10V38C6 40.2091 7.79086 42 10 42H38C40.2091 42 42 40.2091 42 38V10C42 7.79086 40.2091 6 38 6Z"
      fill="#292D32"
    />
    <path
      d="M32 12H16C13.7909 12 12 13.7909 12 16V32C12 34.2091 13.7909 36 16 36H32C34.2091 36 36 34.2091 36 32V16C36 13.7909 34.2091 12 32 12Z"
      fill="white"
    />
    <path
      d="M24 29C26.7614 29 29 26.7614 29 24C29 21.2386 26.7614 19 24 19C21.2386 19 19 21.2386 19 24C19 26.7614 21.2386 29 24 29Z"
      stroke="#292D32"
      strokeWidth="2"
    />
    <path
      d="M31 16C31.5523 16 32 16.4477 32 17C32 17.5523 31.5523 18 31 18C30.4477 18 30 17.5523 30 17C30 16.4477 30.4477 16 31 16Z"
      fill="#292D32"
      stroke="#292D32"
      strokeWidth="2"
    />
  </svg>
)

export const MailIcon: React.FC<IconSvgProps> = ({
  size = 12,
  width,
  height,
  color = "#FFFFFF",
  ...props
}) => (
  <svg
    width={size || width}
    height={size || height}
    viewBox="0 0 48 48"
    fill="none"
    {...props}
  >
    <path
      d="M38 6H10C7.79086 6 6 7.79086 6 10V38C6 40.2091 7.79086 42 10 42H38C40.2091 42 42 40.2091 42 38V10C42 7.79086 40.2091 6 38 6Z"
      fill="#292D32"
    />
    <path
      d="M32 15H16C13.7909 15 12 16.7909 12 19V29C12 31.2091 13.7909 33 16 33H32C34.2091 33 36 31.2091 36 29V19C36 16.7909 34.2091 15 32 15Z"
      fill="white"
    />
    <path
      d="M17 19L22.0462 22.4763C23.199 23.207 24.6415 23.1706 25.7605 22.3824L31 19"
      stroke="#292D32"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
)
export const MailIconNoBg: React.FC<IconSvgProps> = ({
  size = 14,
  width,
  height,
  color = "#FFFFFF",
  ...props
}) => (
  <svg
    width={size || width}
    height={size || height}
    viewBox="0 0 48 48"
    fill="none"
    {...props}
  >
    {/* <path
      d="M38 6H10C7.79086 6 6 7.79086 6 10V38C6 40.2091 7.79086 42 10 42H38C40.2091 42 42 40.2091 42 38V10C42 7.79086 40.2091 6 38 6Z"
      fill="#292D32"
    /> */}
    <path
      d="M32 15H16C13.7909 15 12 16.7909 12 19V29C12 31.2091 13.7909 33 16 33H32C34.2091 33 36 31.2091 36 29V19C36 16.7909 34.2091 15 32 15Z"
      fill="#292D32"
    />
    <path
      d="M17 19L22.0462 22.4763C23.199 23.207 24.6415 23.1706 25.7605 22.3824L31 19"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
)

export const LinkedInIcon: React.FC<IconSvgProps> = ({
  size = 12,
  width,
  height,
  color = "#FFFFFF",
  ...props
}) => (
  <svg
    width={size || width}
    height={size || height}
    viewBox="0 0 48 48"
    fill="none"
    {...props}
  >
    <path
      d="M38 6H10C7.79086 6 6 7.79086 6 10V38C6 40.2091 7.79086 42 10 42H38C40.2091 42 42 40.2091 42 38V10C42 7.79086 40.2091 6 38 6Z"
      fill="#292D32"
    />
    <path
      d="M31 12H17C14.2386 12 12 14.2386 12 17V31C12 33.7614 14.2386 36 17 36H31C33.7614 36 36 33.7614 36 31V17C36 14.2386 33.7614 12 31 12Z"
      fill="white"
    />
    <path
      d="M17.6465 19.074V16.986H19.8425V19.074H17.6465ZM17.6465 30V20.532H19.8425V30H17.6465ZM22.1816 30V20.532H24.0176L24.1976 21.792H24.3236C24.5396 21.504 24.7916 21.252 25.0796 21.036C25.3796 20.808 25.7156 20.634 26.0876 20.514C26.4716 20.382 26.8916 20.316 27.3476 20.316C27.9476 20.316 28.4756 20.424 28.9316 20.64C29.3996 20.856 29.7656 21.204 30.0296 21.684C30.2936 22.164 30.4256 22.806 30.4256 23.61V30H28.2116V24.006C28.2116 23.67 28.1696 23.394 28.0856 23.178C28.0136 22.95 27.8996 22.77 27.7436 22.638C27.5996 22.494 27.4196 22.392 27.2036 22.332C26.9876 22.272 26.7476 22.242 26.4836 22.242C26.0876 22.242 25.7276 22.338 25.4036 22.53C25.0916 22.722 24.8396 22.986 24.6476 23.322C24.4676 23.658 24.3776 24.048 24.3776 24.492V30H22.1816Z"
      fill="#292D32"
    />
  </svg>
)
export const LinkedInIconNoBg: React.FC<IconSvgProps> = ({
  size = 12,
  width,
  height,
  color = "#FFFFFF",
  ...props
}) => (
  <svg
    width={size || width}
    height={size || height}
    viewBox="0 0 48 48"
    fill="none"
    {...props}
  >
    <path
      d="M31 12H17C14.2386 12 12 14.2386 12 17V31C12 33.7614 14.2386 36 17 36H31C33.7614 36 36 33.7614 36 31V17C36 14.2386 33.7614 12 31 12Z"
      fill="#292D32"
    />
    <path
      d="M17.6465 19.074V16.986H19.8425V19.074H17.6465ZM17.6465 30V20.532H19.8425V30H17.6465ZM22.1816 30V20.532H24.0176L24.1976 21.792H24.3236C24.5396 21.504 24.7916 21.252 25.0796 21.036C25.3796 20.808 25.7156 20.634 26.0876 20.514C26.4716 20.382 26.8916 20.316 27.3476 20.316C27.9476 20.316 28.4756 20.424 28.9316 20.64C29.3996 20.856 29.7656 21.204 30.0296 21.684C30.2936 22.164 30.4256 22.806 30.4256 23.61V30H28.2116V24.006C28.2116 23.67 28.1696 23.394 28.0856 23.178C28.0136 22.95 27.8996 22.77 27.7436 22.638C27.5996 22.494 27.4196 22.392 27.2036 22.332C26.9876 22.272 26.7476 22.242 26.4836 22.242C26.0876 22.242 25.7276 22.338 25.4036 22.53C25.0916 22.722 24.8396 22.986 24.6476 23.322C24.4676 23.658 24.3776 24.048 24.3776 24.492V30H22.1816Z"
      fill={color}
    />
  </svg>
)

export const YoutubeIcon: React.FC<IconSvgProps> = ({
  size = 12,
  width,
  height,
  color = "#FFFFFF",
  ...props
}) => (
  <svg
    width={size || width}
    height={size || height}
    viewBox="0 0 48 48"
    fill="none"
    {...props}
  >
    <path
      d="M38 6H10C7.79086 6 6 7.79086 6 10V38C6 40.2091 7.79086 42 10 42H38C40.2091 42 42 40.2091 42 38V10C42 7.79086 40.2091 6 38 6Z"
      fill="#292D32"
    />
    <path
      d="M32 14H16C13.7909 14 12 15.7909 12 18V30C12 32.2091 13.7909 34 16 34H32C34.2091 34 36 32.2091 36 30V18C36 15.7909 34.2091 14 32 14Z"
      fill="white"
    />
    <path
      d="M26.8571 22.7628C27.8095 23.3127 27.8095 24.6873 26.8571 25.2372L23.6429 27.0929C22.6905 27.6428 21.5 26.9555 21.5 25.8558V22.1442C21.5 21.0445 22.6905 20.3572 23.6429 20.9071L26.8571 22.7628Z"
      fill="#292D32"
    />
  </svg>
)
