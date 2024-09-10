import { useNavigate, useParams } from 'react-router-dom';
import { StarIcon } from "@heroicons/react/16/solid";
import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";
import { PropertyListMain } from 'src/lib/types/propertyListMainType';

interface PropertyDetailProps {
    isDarkMode: boolean;
}

export default function PropertyDetail({ isDarkMode }: PropertyDetailProps) {

    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const propertydataFromLocalStorage: PropertyListMain[] = JSON.parse(localStorage.getItem('Propertydata') ?? '[]');

    // Find the property by id
    const property = propertydataFromLocalStorage.find(property => property.id === id);

    // Redirect to "/property" if the property is not found
    if (!property) {
        window.location.pathname = "/property"
    }

    // Access facility from the found property
    const facility = property?.propertyDetail?.facility;
    return (
        <div className={`md:pt-7 pt-5 px-[18px] md:pl-[25px] pb-7 md:pb-5  md:pr-3.5`}>
            <div className={`${isDarkMode ? "bg-[#1A1D1F]" : "bg-[#FCFCFC]"} p-5 rounded-[15px]`}>
                <h1 onClick={() => navigate("/property")} className={`mb-[25px] font-semibold text-[22px] ${isDarkMode ? "text-[#EFEFEF]" : "text-[#11142D]"} flex items-center gap-[25px]`}>
                    <svg width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M7.79292 0.792893C8.18345 1.18342 8.18345 1.81658 7.79292 2.20711L2.00003 8L7.79292 13.7929C8.18345 14.1834 8.18345 14.8166 7.79292 15.2071C7.4024 15.5976 6.76923 15.5976 6.37871 15.2071L0.585817 9.41422C-0.195233 8.63317 -0.195231 7.36683 0.585817 6.58579L6.37871 0.792893C6.76923 0.402369 7.4024 0.402369 7.79292 0.792893Z" fill="currentColor" />
                    </svg>
                    Details
                </h1>
                <div className="flex max-xl:flex-col items-center justify-between gap-[21px]">
                    <div className="max-w-[764px] w-full ">
                        <div className="flex items-center gap-[21px] w-full mb-[15px]">
                            <div className="flex max-md:flex-col gap-5 w-full">
                                <div className=" w-full max-h-[345px] overflow-hidden rounded-[10px] ">
                                    <img src={property?.propertyDetail?.images?.bigImg} alt={property?.propertyDetail?.images?.bigImg} className='w-full object-cover h-full' />
                                </div>
                                <div className="md:max-w-[203px] w-full grid max-md:grid-cols-2 grid-cols-1 gap-5 md:gap-[22px]">
                                    <div className="w-full  h-[161px] overflow-hidden rounded-[10px]">
                                        <img src={property?.propertyDetail?.images?.smallImg?.img1} alt={property?.propertyDetail?.images?.bigImg} className='w-full h-full object-cover' />
                                    </div>
                                    <div className="w-full  h-[161px] overflow-hidden rounded-[10px] ">
                                        <img src={property?.propertyDetail?.images?.smallImg?.img2} alt={property?.propertyDetail?.images?.bigImg} className='w-full h-full object-cover' />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between md:pr-[61px] mb-5">
                            <div className="">
                                <h2 className={`${isDarkMode ? "text-[#EFEFEF]" : "text-[#11142D]"} font-medium text-lg mb-2.5 leading-6`}>{property?.type}</h2>
                                <h2 className={`${isDarkMode ? "text-[#EFEFEF]" : "text-[#11142D]"} font-medium text-[22px] mb-2 leading-[30px]`}>{property?.title}</h2>
                                <p className={`${isDarkMode ? "text-[#6F767E]" : "text-[#808191]"} font-normal text-sm flex items-center gap-[5px]`}>
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M12.534 10.3542C13.1554 9.57904 13.5261 8.59791 13.5261 7.52609C13.5261 5.0264 11.4997 3 8.99996 3C6.50028 3 4.47388 5.0264 4.47388 7.52609C4.47388 8.59781 4.84449 9.57886 5.46577 10.354L5.47024 10.3595C5.60178 10.5234 5.72356 10.696 5.85008 10.8637C6.06981 11.155 6.37968 11.5641 6.73971 12.0347C7.41061 12.9115 8.2487 13.9924 9.0005 14.9204C9.75465 13.9904 10.5947 12.9078 11.2669 12.0299C11.6276 11.5588 11.9379 11.1493 12.158 10.8577C12.2838 10.6909 12.4033 10.5172 12.534 10.3542ZM13.7065 11.2941C13.7065 11.2941 13.7053 11.2959 13.7044 11.2971C13.6659 11.3484 13.3133 11.8197 12.8022 12.4908C12.044 13.4865 10.9373 14.9221 9.99108 16.0795C9.47346 16.7126 8.52665 16.7123 8.00935 16.079C6.39209 14.0989 4.30045 11.2985 4.30045 11.2985L4.29557 11.2924C3.46856 10.2607 2.97388 8.95118 2.97388 7.52609C2.97388 4.19797 5.67185 1.5 8.99996 1.5C12.3281 1.5 15.0261 4.19797 15.0261 7.52609C15.0261 8.41277 14.8345 9.25473 14.4906 10.0128C14.2826 10.4715 14.0188 10.8994 13.7078 11.288L13.7057 11.2908L13.7044 11.2924H13.7078L13.7065 11.2941Z" fill="currentColor" />
                                        <path fillRule="evenodd" clipRule="evenodd" d="M9 8.25C9.41421 8.25 9.75 7.91421 9.75 7.5C9.75 7.08579 9.41421 6.75 9 6.75C8.58579 6.75 8.25 7.08579 8.25 7.5C8.25 7.91421 8.58579 8.25 9 8.25ZM11.25 7.5C11.25 8.74264 10.2426 9.75 9 9.75C7.75736 9.75 6.75 8.74264 6.75 7.5C6.75 6.25736 7.75736 5.25 9 5.25C10.2426 5.25 11.25 6.25736 11.25 7.5Z" fill="currentColor" />
                                    </svg>
                                    {property?.location}
                                </p>
                            </div>
                            <div className="max-md:hidden">
                                {property?.propertyDetail?.rating && (
                                    <div className="flex items-center gap-[3px] mb-2">
                                        {Array.from(
                                            {
                                                length: Math.floor(property.propertyDetail.rating)
                                            },
                                            (_, i) => (
                                                <StarIcon key={i} className="h-6 w-6 text-yellow-500" />
                                            )
                                        )}
                                        {Array.from({ length: 5 - Math.floor(property.propertyDetail.rating) }, (_, i) => (
                                            <StarIconOutline key={i} className="h-6 w-6 text-yellow-500" />
                                        ))}
                                    </div>
                                )}
                                <p className={`${isDarkMode ? "text-[#EFEFEF]" : "text-[#11142D]"} font-medium text-base mb-2 leading-[21px ]`}>Price</p>
                                <p className={`font-normal text-sm ${isDarkMode ? "text-[#6F767E]" : "text-[#808191]"} `}><span className='font-bold text-[25px] text-[#475BE8]'>${property?.propertyDetail?.priceOneDay}</span> For One Day</p>
                            </div>
                        </div>
                        <div className="overflow-x-auto pb-2.5">
                            <div className="mb-[25px]">
                                <h3 className={`${isDarkMode ? "text-[#EFEFEF]" : "text-[#11142D]"} font-medium text-lg mb-7`}>Facillity</h3>
                                <div className="grid grid-cols-4 gap-x-[69px] gap-y-5">
                                    {facility && facility.beds && (
                                        <div className={`min-w-[139px] ${isDarkMode ? "text-[#EFEFEF]" : "text-[#11142D]"} font-medium text-sm flex items-center gap-[5px]`}>
                                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M13.6666 9.19432V4.22516L4.33306 4.2223C4.33306 4.2223 4.33364 7.66864 4.33325 8.86145C4.34732 7.86161 5.12301 7.05576 6.08403 7.05576H7.24879C8.21579 7.05576 8.99977 7.87861 8.99977 8.88909C8.99977 7.87656 9.78082 7.05576 10.7508 7.05576H11.9155C12.8825 7.05576 13.6665 7.87861 13.6665 8.88909L13.6666 9.19432ZM3.16655 9.49991V4.22511C3.16655 3.54845 3.69048 3 4.33316 3H13.6667C14.311 3 14.8333 3.5501 14.8333 4.22511V9.49991H15.4163C15.7387 9.49991 16 9.77265 16 10.1095V14.3904C16 14.727 15.7412 15 15.4168 15H13.6666C13.3444 15 12.9653 14.7526 12.8223 14.4533L12.7609 14.3246C12.6168 14.0226 12.2369 13.7777 11.9141 13.7777H6.08586C5.76234 13.7777 5.38196 14.0251 5.23909 14.3246L5.17766 14.4533C5.03352 14.7552 4.65783 15 4.33341 15H2.5832C2.26113 15 2 14.7273 2 14.3904V10.1095C2 9.77286 2.26103 9.49991 2.5837 9.49991H3.16655ZM3.16655 13.7776H4.19546C4.53648 13.0633 5.32134 12.5554 6.08569 12.5554H11.914C12.6781 12.5554 13.4622 13.0612 13.8042 13.7776H14.8331V10.7222H3.16655V13.7776ZM7.83307 9.49991V8.88883C7.83307 8.55255 7.57077 8.27765 7.24879 8.27765H6.08404C5.75961 8.27765 5.49976 8.55009 5.49976 8.88883V9.49991H7.83307ZM12.4998 9.49991V8.88883C12.4998 8.55255 12.2375 8.27765 11.9156 8.27765H10.7508C10.4264 8.27765 10.1665 8.55009 10.1665 8.88883V9.49991H12.4998Z" fill="#808191" />
                                            </svg>
                                            {property.beds} Beds
                                        </div>
                                    )}
                                    {facility && facility.baths && (
                                        <div className={`min-w-[139px] ${isDarkMode ? "text-[#EFEFEF]" : "text-[#11142D]"} font-medium text-sm flex items-center gap-[5px]`}>
                                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6.93245 4C6.11497 4 5.44597 4.66904 5.44597 5.48645C5.44597 5.83792 5.56978 6.16025 5.77581 6.41555C5.33151 6.53395 5 6.93919 5 7.41884V10.6891C5 11.1011 5.2417 11.4552 5.59465 11.6274V13.662C5.59465 14.398 6.19646 14.9999 6.93253 14.9999C7.6686 14.9999 8.27041 14.3981 8.27041 13.662V11.6274C8.62337 11.4552 8.86506 11.1011 8.86506 10.6891V7.41884C8.86506 6.93919 8.53357 6.53387 8.08925 6.41544C8.29528 6.16026 8.41909 5.83784 8.41909 5.48635C8.41909 4.66891 7.74983 4 6.93245 4ZM11.7705 4C10.953 4 10.284 4.66904 10.284 5.48645C10.284 5.85692 10.4201 6.19627 10.6463 6.45736C10.2769 6.60607 9.98664 6.95983 9.98664 7.41892V9.05409C9.98664 9.2027 9.96601 9.33792 10.0563 9.51857C10.0808 9.56745 10.1368 9.59838 10.1818 9.63937L9.57323 10.8518C9.52647 10.9439 9.53082 11.0537 9.58484 11.1418C9.63886 11.2299 9.73467 11.2837 9.83805 11.2838H10.4327V13.6622C10.4349 14.3971 11.0345 15 11.7706 15C12.5067 15 13.1063 14.3971 13.1085 13.6622V11.2838H13.7031C13.8065 11.2837 13.9022 11.2299 13.9562 11.1418C14.0101 11.0537 14.0146 10.9439 13.9677 10.8518L13.3592 9.63937C13.4041 9.59838 13.4602 9.56745 13.4846 9.51857C13.5749 9.3379 13.5543 9.20268 13.5543 9.05409V7.41892C13.5543 6.95983 13.2641 6.60605 12.8946 6.45736C13.121 6.19637 13.2569 5.85692 13.2569 5.48645C13.2569 4.66901 12.5879 4 11.7705 4ZM6.93245 4.59463C7.42859 4.59463 7.82439 4.99041 7.82439 5.48656C7.82439 5.98271 7.42862 6.37849 6.93245 6.37849C6.43631 6.37849 6.04051 5.98271 6.04051 5.48656C6.04051 4.99041 6.43628 4.59463 6.93245 4.59463ZM11.7705 4.59463C12.2667 4.59463 12.6625 4.99041 12.6625 5.48656C12.6625 5.98271 12.2667 6.37849 11.7705 6.37849C11.2744 6.37849 10.8786 5.98271 10.8786 5.48656C10.8786 4.99041 11.2744 4.59463 11.7705 4.59463ZM6.04056 6.97301H7.82442C8.07659 6.97301 8.27039 7.16676 8.27039 7.41892V10.6892C8.27039 10.909 8.10801 11.1001 7.91265 11.1398C7.77412 11.1685 7.675 11.2909 7.67572 11.4325V13.6622C7.67572 14.0791 7.34941 14.4055 6.93248 14.4055C6.51555 14.4055 6.18924 14.0791 6.18924 13.6622V11.4325C6.18997 11.2909 6.09084 11.1685 5.95231 11.1397C5.75696 11.0999 5.59458 10.9089 5.59458 10.6891V7.41882C5.59458 7.16665 5.78839 6.97301 6.04056 6.97301ZM11.0273 6.97301H12.5138C12.7307 6.97301 12.9597 7.13697 12.9597 7.41892V9.05409C12.9597 9.16472 12.9546 9.18464 12.9551 9.2027C12.854 9.20519 12.761 9.25894 12.7083 9.34539C12.6557 9.43183 12.6506 9.53903 12.695 9.63004L13.2245 10.6892H12.8111C12.6469 10.6893 12.5139 10.8223 12.5138 10.9865V13.6574V13.662C12.51 14.0776 12.1858 14.4052 11.7705 14.4052C11.3552 14.4052 11.0309 14.0776 11.0273 13.662V10.9865C11.0273 10.8223 10.8942 10.6893 10.73 10.6892H10.3166L10.8462 9.63009C10.8904 9.53908 10.8853 9.43189 10.8328 9.34544C10.7801 9.25899 10.6872 9.20524 10.586 9.20275C10.5864 9.18469 10.5813 9.16477 10.5813 9.05414V7.41897C10.5813 7.13703 10.8104 6.97301 11.0273 6.97301Z" fill="#6F767E" />
                                            </svg>
                                            Baths
                                        </div>
                                    )}
                                    {facility && facility.area && (
                                        <div className={`min-w-[139px] ${isDarkMode ? "text-[#EFEFEF]" : "text-[#11142D]"} font-medium text-sm flex items-center gap-[5px]`}>
                                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M13.8955 7.03298C13.8955 7.2183 13.8549 7.39519 13.774 7.56302C13.6927 7.73107 13.5885 7.87862 13.4612 8.00601C13.3334 8.13377 13.1831 8.23783 13.0093 8.31879C12.8356 8.39985 12.6559 8.44044 12.4707 8.44044C12.2275 8.44044 11.9957 8.37695 11.7757 8.24938C11.5555 8.12212 11.3819 7.95408 11.2544 7.74554H7.72768V11.2725C7.93601 11.4003 8.10396 11.574 8.23153 11.7938C8.35879 12.014 8.42258 12.2455 8.42258 12.4888C8.42258 12.6742 8.38481 12.851 8.30967 13.0188C8.23424 13.1869 8.12998 13.3344 7.99689 13.4618C7.86349 13.5896 7.71292 13.6937 7.54519 13.7746C7.37714 13.8557 7.20036 13.8963 7.01514 13.8963C6.82972 13.8963 6.65293 13.8558 6.48519 13.7746C6.31715 13.6937 6.16647 13.5896 6.0335 13.4618C5.9001 13.3346 5.79594 13.1869 5.72071 13.0188C5.64527 12.8509 5.60781 12.6742 5.60781 12.4888C5.60781 12.2456 5.67129 12.014 5.79886 11.7938C5.92612 11.5739 6.09416 11.4003 6.3027 11.2725L6.3029 7.74528H2.7065C2.57894 7.95381 2.40506 8.12187 2.1852 8.24913C1.96502 8.37669 1.7335 8.44018 1.49022 8.44018C1.3048 8.44018 1.12801 8.3997 0.960273 8.31854C0.792225 8.23758 0.641544 8.13351 0.508575 8.00575C0.375383 7.87848 0.271119 7.73084 0.195787 7.56277C0.120351 7.39502 0.0828857 7.21832 0.0828857 7.03292C0.0828857 6.8479 0.120351 6.66819 0.195787 6.49434C0.270921 6.32057 0.375386 6.17021 0.508575 6.04264C0.641667 5.91518 0.79223 5.81111 0.960273 5.72985C1.12802 5.64889 1.3049 5.60821 1.49022 5.60821C1.7334 5.60821 1.96503 5.6719 2.1852 5.79926C2.40508 5.92683 2.57886 6.09456 2.7065 6.30311H6.30316L6.30306 2.70671C6.09453 2.57924 5.92647 2.40546 5.79921 2.1853C5.67165 1.96552 5.60817 1.7336 5.60817 1.49032C5.60817 1.3053 5.64563 1.12842 5.72107 0.960373C5.7962 0.792628 5.90047 0.641953 6.03385 0.508676C6.16695 0.375584 6.31751 0.27132 6.48555 0.195887C6.6534 0.120753 6.83007 0.0828857 7.0155 0.0828857C7.20072 0.0828857 7.3775 0.120755 7.54555 0.195887C7.71329 0.271222 7.86397 0.375586 7.99724 0.508676C8.13034 0.642069 8.2344 0.792639 8.31003 0.960373C8.38517 1.12842 8.42293 1.3052 8.42293 1.49032C8.42293 1.7335 8.35915 1.96552 8.23188 2.1853C8.10432 2.40548 7.93637 2.57924 7.72804 2.70671V6.30336H11.255C11.3825 6.09484 11.5562 5.92709 11.7763 5.79952C11.9962 5.67205 12.228 5.60847 12.4713 5.60847C12.6565 5.60847 12.8362 5.64905 13.0099 5.73011C13.1837 5.81117 13.334 5.91543 13.4618 6.0429C13.589 6.17047 13.6932 6.32084 13.7746 6.4946C13.8551 6.66807 13.8957 6.84786 13.8957 7.0329L13.8955 7.03298Z" fill="#6F767E" />
                                            </svg>

                                            {property.area}M Area
                                        </div>
                                    )}
                                    {facility && facility.smookingArea && (
                                        <div className={`min-w-[139px] ${isDarkMode ? "text-[#EFEFEF]" : "text-[#11142D]"} font-medium text-sm flex items-center gap-[5px]`}>
                                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M4.21918 4.21918C6.86183 1.57652 11.1479 1.57652 13.7905 4.21918C16.4332 6.86183 16.4332 11.1479 13.7905 13.7905C11.1479 16.4332 6.86183 16.4332 4.21918 13.7905C1.57652 11.1479 1.57652 6.86183 4.21918 4.21918ZM5.01874 5.01874C7.21972 2.81775 10.7898 2.81775 12.9909 5.01874C15.1921 7.21972 15.1919 10.7898 12.9909 12.9909C10.7899 15.1921 7.21988 15.1919 5.01874 12.9909C2.81759 10.7899 2.81775 7.21988 5.01874 5.01874Z" fill="#6F767E" />
                                                <path fillRule="evenodd" clipRule="evenodd" d="M4.52832 9.18379C5.14947 7.48513 6.40024 7.7722 6.16138 6.08496C6.04677 7.65312 4.98958 7.1529 4.52832 9.18379Z" fill="#6F767E" />
                                                <path fillRule="evenodd" clipRule="evenodd" d="M4.62366 9.14528C5.31715 8.01876 6.01524 8.29228 6.18932 7.12097C5.825 8.18901 5.28349 7.78131 4.62366 9.14528Z" fill="#6F767E" />
                                                <path fillRule="evenodd" clipRule="evenodd" d="M4.45142 9.04258C4.71982 7.68937 5.574 7.66486 5.27276 6.48059C5.32931 7.64406 4.58559 7.47722 4.45142 9.04258Z" fill="#6F767E" />
                                                <path fillRule="evenodd" clipRule="evenodd" d="M13.401 8.26656C10.549 9.24339 7.69655 10.2204 4.84458 11.1975C4.6684 11.2578 4.45797 11.112 4.37609 10.873L4.12015 10.1259C4.03829 9.88704 4.11523 9.64276 4.29142 9.58249C7.14339 8.60565 9.99587 7.62861 12.8478 6.65157C13.1224 6.55755 13.4133 6.67578 13.495 6.91473L13.751 7.66186C13.8327 7.90072 13.6755 8.17252 13.401 8.26656H13.401ZM11.4489 8.81399C11.4882 8.71153 11.4904 8.58065 11.4461 8.45129L11.1902 7.70416C11.1459 7.57479 11.0637 7.47283 10.9699 7.41598L4.82959 9.51923C4.92341 9.57608 5.00547 9.67803 5.04977 9.80741L5.30571 10.5545C5.35001 10.6839 5.34769 10.8148 5.30842 10.9172L11.449 8.81399H11.4489Z" fill="#6F767E" />
                                            </svg>
                                            Smooking Area
                                        </div>
                                    )}
                                    {facility && facility.kitchen && (
                                        <div className={`min-w-[139px] ${isDarkMode ? "text-[#EFEFEF]" : "text-[#11142D]"} font-medium text-sm flex items-center gap-[5px]`}>
                                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M7.89021 3.00052C7.7097 3.01864 7.57224 3.17062 7.57244 3.35212V4.16153L6.33233 6.23396C6.26694 6.34328 6.26547 6.4794 6.32859 6.5901C6.39171 6.7008 6.50959 6.76896 6.63701 6.76827H11.3631C11.4902 6.76817 11.6074 6.69982 11.67 6.58921C11.7326 6.4787 11.7311 6.34298 11.6658 6.23395L10.4257 4.16152V3.35212C10.4249 3.15721 10.2662 2.99971 10.0713 3.00052H7.92681C7.9146 2.99983 7.90248 2.99983 7.89027 3.00052L7.89021 3.00052ZM8.27832 3.70375H9.71903V3.90231H8.27832V3.70375ZM8.12736 4.60829H9.87068L10.7379 6.0623H7.25736L8.12736 4.60829ZM3.35156 8.66767C3.15667 8.66846 2.9992 8.82712 3 9.02204V14.6477C3.0004 14.8418 3.15747 14.9992 3.35156 15H14.6457C14.7394 15.0004 14.8294 14.9634 14.8959 14.8973C14.9624 14.8312 14.9998 14.7415 15 14.6477V9.02205C15.0004 8.928 14.9632 8.83758 14.8966 8.7711C14.8301 8.70452 14.7397 8.66729 14.6457 8.66769L3.35156 8.66767ZM3.70589 9.37433H6.76437V11.4819H3.70589V9.37433ZM7.47101 9.37433H10.5295V10.5105H7.47101V9.37433ZM11.2354 9.37433H14.2939V14.2935H11.2354V9.37433ZM4.28698 9.65011C4.09189 9.66026 3.9419 9.82661 3.95196 10.0217C3.9621 10.2168 4.12843 10.3668 4.32351 10.3568H4.87843C5.07351 10.3568 5.23168 10.1986 5.23168 10.0034C5.23168 9.80827 5.07352 9.65009 4.87843 9.65009H4.32351C4.3113 9.6494 4.29918 9.6494 4.28697 9.65009L4.28698 9.65011ZM11.8271 9.65011C11.632 9.66026 11.482 9.82661 11.492 10.0217C11.5022 10.2168 11.6685 10.3668 11.8636 10.3568H12.4185C12.6136 10.3568 12.7718 10.1986 12.7718 10.0034C12.7718 9.80827 12.6136 9.65009 12.4185 9.65009H11.8636C11.8514 9.6494 11.8393 9.6494 11.8271 9.65009L11.8271 9.65011ZM7.47101 11.2165H10.5295V14.2936H7.47101V11.2165ZM8.06108 11.4792C8.06059 11.4794 8.06019 11.4797 8.0597 11.4799C7.87919 11.498 7.74173 11.65 7.74193 11.8315V13.6785C7.74153 13.7725 7.77876 13.8629 7.84533 13.9294C7.9118 13.996 8.0022 14.0332 8.09625 14.0328H9.90162C9.99566 14.0332 10.0861 13.996 10.1525 13.9294C10.2191 13.8629 10.2563 13.7725 10.2559 13.6785V11.8315C10.2551 11.6366 10.0965 11.4791 9.90161 11.4799H8.09624C8.08452 11.4791 8.0728 11.4788 8.06108 11.4792H8.06108ZM8.4478 12.1831H9.55006V13.3269H8.4478V12.1831ZM3.70578 12.1886H6.76427V14.2934L3.70578 14.2933V12.1886ZM4.30551 12.4361V12.436C4.21058 12.4339 4.1188 12.4702 4.05084 12.5367C3.98298 12.6031 3.94468 12.6941 3.94468 12.789C3.94468 12.8841 3.98298 12.9751 4.05084 13.0414C4.11878 13.1079 4.21056 13.1442 4.30551 13.142H4.86043C4.95536 13.1442 5.04714 13.1079 5.1151 13.0414C5.18295 12.9751 5.22126 12.8841 5.22126 12.789C5.22126 12.6941 5.18295 12.6031 5.1151 12.5367C5.04716 12.4702 4.95538 12.4339 4.86043 12.436L4.30551 12.4361Z" fill="#6F767E" />
                                            </svg>
                                            Kitchen
                                        </div>
                                    )}
                                    {facility && facility.balcony && (
                                        <div className={`min-w-[139px] ${isDarkMode ? "text-[#EFEFEF]" : "text-[#11142D]"} font-medium text-sm flex items-center gap-[5px]`}>
                                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M3.32626 3.00045C3.14184 3.01893 3.00151 3.17432 3.00213 3.35976V5.9479C3.00133 6.14669 3.16184 6.30849 3.36072 6.30931H8.09626C8.29504 6.30851 8.45556 6.14669 8.45484 5.9479V3.35976C8.45444 3.16168 8.29423 3.00117 8.09626 3.00045H3.36072C3.34916 2.99985 3.33771 2.99985 3.32626 3.00045H3.32626ZM3.72213 3.72115H5.36743V5.58934H3.72213V3.72115ZM6.08743 3.72115H7.73484V5.58934H6.08743V3.72115ZM9.40406 5.74334C9.30803 5.74294 9.21593 5.78091 9.14812 5.84871C9.08022 5.91661 9.04225 6.00873 9.04265 6.10475V9.06215H3.36083C3.2652 9.06205 3.17339 9.09992 3.10579 9.16752C3.03809 9.23512 3.00012 9.32683 3.00012 9.42245C3.00012 9.51808 3.03809 9.60979 3.10579 9.67739C3.17339 9.74499 3.2652 9.78286 3.36083 9.78286H3.56544V14.8797C3.56503 14.9756 3.603 15.0677 3.6709 15.1356C3.73871 15.2034 3.83082 15.2414 3.92684 15.2411H14.8809C14.8928 15.2409 14.9048 15.2402 14.9167 15.2389C15.1017 15.2211 15.2427 15.0654 15.2423 14.8796V6.10458C15.2426 6.00855 15.2046 5.91644 15.1368 5.84854C15.0689 5.78074 14.9768 5.74277 14.8809 5.74317L9.40406 5.74334ZM9.76265 6.46334H14.5221V9.06203H9.76265V6.46334ZM10.4004 6.73193C10.3049 6.73354 10.214 6.77311 10.1477 6.84182C10.0814 6.91052 10.045 7.00273 10.0467 7.09826V7.61154C10.0389 7.71158 10.0732 7.81032 10.1413 7.88396C10.2094 7.95769 10.3053 7.99957 10.4056 7.99957C10.5059 7.99957 10.6018 7.95769 10.67 7.88396C10.7381 7.81033 10.7723 7.71159 10.7646 7.61154V7.09826C10.7663 7.00092 10.7285 6.90711 10.6599 6.838C10.5913 6.769 10.4977 6.73073 10.4004 6.73193L10.4004 6.73193ZM4.28527 9.78267H9.04267V14.521H4.28527V9.78267ZM9.76267 9.78267H14.5221V14.521H9.76267V9.78267ZM10.4004 10.0513C10.388 10.0513 10.3755 10.0521 10.3631 10.0534C10.1798 10.0758 10.0432 10.2331 10.0467 10.4176V10.9302C10.0389 11.0302 10.0733 11.1291 10.1414 11.2027C10.2095 11.2763 10.3053 11.3182 10.4056 11.3182C10.506 11.3182 10.6018 11.2763 10.67 11.2027C10.7381 11.1291 10.7723 11.0302 10.7646 10.9302V10.4175V10.4176C10.7663 10.3202 10.7286 10.2264 10.6599 10.1573C10.5913 10.0883 10.4977 10.0501 10.4004 10.0513L10.4004 10.0513ZM6.14856 10.1785V10.1784C6.05163 10.1763 5.95801 10.2133 5.88879 10.2811C5.81948 10.3488 5.78041 10.4416 5.78041 10.5384C5.78041 10.6354 5.81948 10.7282 5.88879 10.7959C5.958 10.8637 6.05161 10.9006 6.14856 10.8984H7.18214C7.27897 10.9006 7.37259 10.8637 7.44191 10.7959C7.51111 10.7282 7.55019 10.6354 7.55019 10.5384C7.55019 10.4416 7.51111 10.3488 7.44191 10.2811C7.3726 10.2133 7.27898 10.1763 7.18214 10.1784L6.14856 10.1785ZM4.90473 11.3C4.72051 11.3184 4.5804 11.4735 4.5806 11.6585V13.8805C4.58141 14.0781 4.74142 14.2382 4.93919 14.2389H8.39159C8.58927 14.2382 8.74938 14.0781 8.75017 13.8805V11.6586C8.74937 11.4608 8.58926 11.3007 8.39159 11.3H4.93919C4.92764 11.2994 4.91619 11.2994 4.90474 11.3H4.90473ZM5.3006 12.02H8.03017V13.5191L5.3006 13.519V12.02Z" fill="#6F767E" />
                                            </svg>
                                            Balcony
                                        </div>
                                    )}
                                    {facility && facility.wifi && (
                                        <div className={`min-w-[139px] ${isDarkMode ? "text-[#EFEFEF]" : "text-[#11142D]"} font-medium text-sm flex items-center gap-[5px]`}>
                                            <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M5.99997 1.02838e-05C3.67175 1.02838e-05 1.56163 1.01541 0.105202 2.75366C0.00849099 2.86869 -0.0245203 3.03121 0.0186275 3.17995C0.0616825 3.32869 0.174481 3.44108 0.314342 3.4748C0.454293 3.50852 0.60001 3.4584 0.696804 3.34337C1.99924 1.78898 3.88486 0.871099 6 0.871099C8.11513 0.871099 10.0008 1.78898 11.3032 3.34337C11.3751 3.42873 11.4751 3.47956 11.5813 3.48473C11.6876 3.48979 11.7914 3.44878 11.8698 3.37051C11.9483 3.29234 11.995 3.18339 11.9996 3.06775C12.0043 2.95201 11.9666 2.83901 11.8948 2.75365C10.4382 1.01548 8.32823 0 6.00004 0L5.99997 1.02838e-05ZM5.99997 2.46772C4.3808 2.46772 2.8838 3.15353 1.8423 4.34572C1.7693 4.42997 1.73006 4.54226 1.73322 4.658C1.73629 4.77373 1.78158 4.88329 1.85885 4.96278C1.93622 5.04217 2.03935 5.0849 2.14564 5.08146C2.25193 5.07801 2.35255 5.0288 2.42555 4.94456C3.30886 3.9332 4.58758 3.33874 5.99997 3.33874C7.41236 3.33874 8.69097 3.93323 9.5744 4.94456C9.64739 5.0288 9.74801 5.07801 9.8543 5.08146C9.9606 5.0849 10.0637 5.04217 10.1411 4.96278C10.2184 4.8833 10.2637 4.77374 10.2667 4.658C10.2699 4.54226 10.2306 4.42997 10.1576 4.34572C9.11624 3.15353 7.61924 2.46772 5.99998 2.46772H5.99997ZM5.99997 4.79035C5.09302 4.79035 4.2202 5.12855 3.59202 5.78377C3.50228 5.85931 3.4463 5.97272 3.43784 6.09584C3.42938 6.21887 3.46927 6.34008 3.54766 6.42927C3.62606 6.51847 3.7355 6.56729 3.84876 6.56354C3.96211 6.5599 4.06859 6.504 4.14185 6.40973C4.5989 5.93301 5.27615 5.66124 5.99991 5.66124C6.72367 5.66124 7.40092 5.93301 7.85797 6.40973C7.93124 6.504 8.03772 6.5599 8.15106 6.56354C8.26433 6.56729 8.37378 6.51848 8.45216 6.42927C8.53054 6.34007 8.57044 6.21886 8.56198 6.09584C8.55352 5.97272 8.49754 5.85931 8.4078 5.78377C7.77964 5.12855 6.90683 4.79035 5.99986 4.79035H5.99997ZM5.99997 6.67747C5.4157 6.67747 4.93345 7.20249 4.93345 7.83868C4.93345 8.47498 5.4157 9 5.99997 9C6.58423 9 7.06648 8.47498 7.06648 7.83868C7.06648 7.20249 6.58423 6.67747 5.99997 6.67747ZM5.99997 7.54839C6.15191 7.54839 6.26656 7.67324 6.26656 7.83868C6.26656 8.00424 6.15191 8.12908 5.99997 8.12908C5.84802 8.12908 5.73337 8.00424 5.73337 7.83868C5.73337 7.67323 5.84802 7.54839 5.99997 7.54839Z" fill="#6F767E" />
                                            </svg>
                                            Wifi
                                        </div>
                                    )}
                                    {facility && facility.parkingArea && (
                                        <div className={`min-w-[139px] ${isDarkMode ? "text-[#EFEFEF]" : "text-[#11142D]"} font-medium text-sm flex items-center gap-[5px]`}>
                                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M4.77306 9.31521C4.44189 9.31521 4.1731 9.04642 4.1731 8.71524V3.30187C4.1731 2.9707 4.44189 2.7019 4.77306 2.7019H6.48908C7.70529 2.7019 8.69529 3.69131 8.69529 4.90811C8.69529 6.12491 7.70588 7.1137 6.48908 7.1137H5.37313V8.71452C5.37303 9.04629 5.10483 9.31508 4.77306 9.31508V9.31521ZM5.37303 5.91372H6.48898C7.04394 5.91372 7.49515 5.46251 7.49515 4.90816C7.49515 4.3532 7.04394 3.90199 6.48898 3.90199H5.37303V5.91372Z" fill="#6F767E" />
                                                <path d="M6.00837 12.0085C4.50298 12.0085 3.05997 11.4433 1.94654 10.4162C1.70296 10.1912 1.68739 9.81198 1.91179 9.56839C2.13619 9.3248 2.51538 9.30862 2.75956 9.53363C3.65172 10.3562 4.80544 10.8086 6.00856 10.8086C8.65508 10.8086 10.8086 8.65523 10.8086 6.00851C10.8086 3.362 8.65528 1.20843 6.00856 1.20843C3.36205 1.20843 1.20848 3.36179 1.20848 6.00851C1.20848 6.72128 1.36688 7.41374 1.67828 8.06766C1.82051 8.3671 1.69385 8.72528 1.39511 8.86743C1.09567 9.00966 0.738085 8.88299 0.595345 8.58426C0.205902 7.76773 0.00854492 6.90129 0.00854492 6.00846C0.00854492 2.70006 2.70006 0.00854492 6.00846 0.00854492C9.31686 0.00854492 12.0084 2.70006 12.0084 6.00846C12.0084 9.31686 9.31686 12.0084 6.00846 12.0084L6.00837 12.0085Z" fill="#6F767E" />
                                            </svg>
                                            Parking Area
                                        </div>
                                    )}

                                </div>
                            </div>
                            <div className="">
                                <h3 className={`${isDarkMode ? "text-[#EFEFEF]" : "text-[#11142D]"} font-medium text-lg mb-7`}>Description</h3>
                                <p className={`${isDarkMode ? "text-[#808191]" : "text-[#6F767E]"} font-normal text-sm leading-5`}>
                                    {property?.propertyDetail?.description}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="xl:max-w-[326px] max-md:grid-cols-1 max-xl:grid grid-cols-2 max-xl:gap-5 w-full">
                        <div className={`${isDarkMode ? "border-[#272B30]" : "border-[#E4E4E4]"} xl:mb-5  rounded-[10px] border pt-[40px] px-[25px] pb-5 flex flex-col items-center`}>
                            <div className="max-w-[90px] flex mb-[15px] rounded-full overflow-hidden">
                                <img src={property?.propertyDetail?.seller?.sellerImg} alt="" />
                            </div>
                            <h3 className={`${isDarkMode ? "text-[#EFEFEF]" : "text-[#11142D]"} font-semibold text-lg mb-[5px]`}>{property?.propertyDetail?.seller?.name_lastname}</h3>
                            <p className={`${isDarkMode ? "text-[#6F767E]" : "text-[#808191]"} font-normal text-sm mb-2.5`}>{property?.propertyDetail?.seller?.agent}</p>
                            <p className={`${isDarkMode ? "text-[#6F767E]" : "text-[#808191]"} font-normal text-sm flex items-center gap-4 mb-1`}>
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M12.534 10.3542C13.1554 9.57904 13.5261 8.59791 13.5261 7.52609C13.5261 5.0264 11.4997 3 8.99996 3C6.50028 3 4.47388 5.0264 4.47388 7.52609C4.47388 8.59781 4.84449 9.57886 5.46577 10.354L5.47024 10.3595C5.60178 10.5234 5.72356 10.696 5.85008 10.8637C6.06981 11.155 6.37968 11.5641 6.73971 12.0347C7.41061 12.9115 8.2487 13.9924 9.0005 14.9204C9.75465 13.9904 10.5947 12.9078 11.2669 12.0299C11.6276 11.5588 11.9379 11.1493 12.158 10.8577C12.2838 10.6909 12.4033 10.5172 12.534 10.3542ZM13.7065 11.2941C13.7065 11.2941 13.7053 11.2959 13.7044 11.2971C13.6659 11.3484 13.3133 11.8197 12.8022 12.4908C12.044 13.4865 10.9373 14.9221 9.99108 16.0795C9.47346 16.7126 8.52665 16.7123 8.00935 16.079C6.39209 14.0989 4.30045 11.2985 4.30045 11.2985L4.29557 11.2924C3.46856 10.2607 2.97388 8.95118 2.97388 7.52609C2.97388 4.19797 5.67185 1.5 8.99996 1.5C12.3281 1.5 15.0261 4.19797 15.0261 7.52609C15.0261 8.41277 14.8345 9.25473 14.4906 10.0128C14.2826 10.4715 14.0188 10.8994 13.7078 11.288L13.7057 11.2908L13.7044 11.2924H13.7078L13.7065 11.2941Z" fill="currentColor" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M9 8.25C9.41421 8.25 9.75 7.91421 9.75 7.5C9.75 7.08579 9.41421 6.75 9 6.75C8.58579 6.75 8.25 7.08579 8.25 7.5C8.25 7.91421 8.58579 8.25 9 8.25ZM11.25 7.5C11.25 8.74264 10.2426 9.75 9 9.75C7.75736 9.75 6.75 8.74264 6.75 7.5C6.75 6.25736 7.75736 5.25 9 5.25C10.2426 5.25 11.25 6.25736 11.25 7.5Z" fill="currentColor" />
                                </svg>
                                {property?.propertyDetail?.seller?.sellerLocation}
                            </p>
                            <p className={`${isDarkMode ? "text-[#EFEFEF]" : "text-[#11142D]"} font-semibold text-base mb-[25px]`}>{property?.propertyDetail?.seller?.propertis} Propertis</p>
                            <div className="w-full  grid max-md:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-5 lg:items-center">
                                <button onClick={() => navigate("/message")} className={`w-full flex items-center justify-center gap-2 py-2.5 px-[15px] rounded-[5px] bg-[#475BE8]  text-[#EFEFEF]  font-semibold text-base`}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M7 9C7 8.44772 7.44772 8 8 8H16C16.5523 8 17 8.44772 17 9C17 9.55228 16.5523 10 16 10H8C7.44772 10 7 9.55228 7 9Z" fill="#EFEFEF" />
                                        <path fillRule="evenodd" clipRule="evenodd" d="M7 13C7 12.4477 7.44772 12 8 12H12C12.5523 12 13 12.4477 13 13C13 13.5523 12.5523 14 12 14H8C7.44772 14 7 13.5523 7 13Z" fill="#EFEFEF" />
                                        <path fillRule="evenodd" clipRule="evenodd" d="M6.71963 17.4636C7.07906 17.164 7.53213 17 8 17H19C19.5523 17 20 16.5523 20 16V6C20 5.44771 19.5523 5 19 5H5C4.44772 5 4 5.44772 4 6V19.7299L6.71963 17.4636ZM8 19H19C20.6569 19 22 17.6569 22 16V6C22 4.34315 20.6569 3 19 3H5C3.34315 3 2 4.34315 2 6V19.7299C2 21.4256 3.97771 22.3519 5.28037 21.2664L8 19Z" fill="#EFEFEF" />
                                    </svg>
                                    Message
                                </button>
                                <button onClick={() => navigate("/message")} className={`w-full flex items-center justify-center gap-2 py-2.5 px-[15px] rounded-[5px] bg-[#2ED480] text-[#EFEFEF]   font-semibold text-base`}>
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M6.52537 5.14236L5.39465 3.60047C5.31776 3.49561 5.17245 3.46889 5.06328 3.53953C3.58396 4.49673 3.17732 5.95893 3.77081 7.03683C4.41988 8.21566 5.42095 9.66136 6.95647 11.1969C8.492 12.7324 9.93769 13.7335 11.1165 14.3825C12.1944 14.976 13.6566 14.5694 14.6138 13.0901C14.6845 12.9809 14.6577 12.8356 14.5529 12.7587L13.011 11.628C12.7843 11.4617 12.4836 11.4362 12.2321 11.562L11.6175 11.8693C11.0947 12.1306 10.3782 12.2225 9.69985 11.8735C9.24635 11.6402 8.54738 11.1968 7.75197 10.4014C6.95656 9.60597 6.51318 8.90701 6.27987 8.45351C5.93091 7.77519 6.02273 7.05862 6.28409 6.53589L6.59139 5.9213C6.71714 5.6698 6.69165 5.36911 6.52537 5.14236ZM4.2484 2.28017C2.34302 3.51307 1.3622 5.77227 2.45682 7.76032C3.17122 9.05779 4.25634 10.6181 5.89581 12.2575C7.53528 13.897 9.09556 14.9821 10.393 15.6965C12.3811 16.7912 14.6403 15.8103 15.8732 13.905C16.3754 13.1288 16.1854 12.0958 15.4399 11.5491L13.898 10.4184C13.2178 9.91954 12.3157 9.84309 11.5612 10.2203L10.9466 10.5276C10.7687 10.6166 10.5629 10.6306 10.3861 10.5396C10.0638 10.3739 9.49273 10.0208 8.81263 9.34073C8.13253 8.66063 7.7795 8.08955 7.61371 7.7673C7.52271 7.59043 7.53678 7.38462 7.62574 7.20671L7.93303 6.59212C8.31027 5.83764 8.23381 4.93554 7.73498 4.25532L6.60426 2.71342C6.05759 1.96796 5.02452 1.77798 4.2484 2.28017Z" fill="#EFEFEF" />
                                    </svg>
                                    Call
                                </button>
                            </div>
                        </div>
                        <div>
                            <div className='h-[306px]  w-full overflow-hidden grid grid-cols-1 mb-5 rounded-[10px]' dangerouslySetInnerHTML={{ __html: property?.propertyDetail?.seller?.map || "" }} />
                            <button className={`bg-[#475BE8] py-[11px] w-full rounded-[10px] text-[#EFEFEF] font-semibold text-lg mb-[5px] `}>Book Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
