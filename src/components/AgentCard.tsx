import { useNavigate } from "react-router-dom";

interface Agent {
    profileImage: string;
    name: string;
    lastName: string;
    surname: string;
    email: string;
    location: string;
    phone: string;
    properties: number;
    Id: string;
    facebook: string;
    twitter: string;
    instagram: string;
}



interface AgentCardProps {
    isDarkMode: boolean;
    agent: Agent;
}

export default function AgentCard({ agent, isDarkMode }: AgentCardProps) {
    const navigate = useNavigate()
    return (
        <div onClick={() => navigate(`/agentDetail/${agent.Id}`)} className="px-[18px]  md:p-5">
            <div className="flex gap-5 items-start max-md:mb-2.5">
                <div className="max-w-[130px] lg:max-w-[250px] rounded-lg overflow-hidden">
                    <img src={agent.profileImage} alt="" className="object-cover w-full" />
                </div>
                <div className="w-full">
                    <div className="flex  items-center justify-between w-full mb-[3px] xl:mb-[7px]">
                        <h2 className={`leading-[30px] ${isDarkMode ? "text-[#EFEFEF]" : "text-[#11142D]"} max-md:text-lg font-semibold text-[22px] mb-2 leading-[30px]`}>
                            {agent.name} {agent.lastName} {agent.surname}
                        </h2>
                        <button className="max-md:hidden">
                            <svg width="14" height="4" viewBox="0 0 14 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7 2.75C7.41421 2.75 7.75 2.41421 7.75 2C7.75 1.58579 7.41421 1.25 7 1.25C6.58579 1.25 6.25 1.58579 6.25 2C6.25 2.41421 6.58579 2.75 7 2.75Z" stroke="#6F767E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M12.25 2.75C12.6642 2.75 13 2.41421 13 2C13 1.58579 12.6642 1.25 12.25 1.25C11.8358 1.25 11.5 1.58579 11.5 2C11.5 2.41421 11.8358 2.75 12.25 2.75Z" stroke="#6F767E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M1.75 2.75C2.16421 2.75 2.5 2.41421 2.5 2C2.5 1.58579 2.16421 1.25 1.75 1.25C1.33579 1.25 1 1.58579 1 2C1 2.41421 1.33579 2.75 1.75 2.75Z" stroke="#6F767E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                    <p className={`font-normal leading-[22px] text-sm ${isDarkMode ? "text-[#6F767E]" : "text-[#808191]"} max-md:mb-0 mb-2 xl:mb-[52px]`}>Real-Estate Agent</p>
                    <div className="max-md:hidden grid grid-cols-1 xl:grid-cols-2 gap-[5px]  gap-x-5 xl:gap-x-[158px] xl:gap-y-5">
                        {agent.email.length && agent.email && (
                            <div className={`flex items-center gap-2.5 ${isDarkMode ? "text-[#6F767E]" : "text-[#808191]"} font-normal text-xs md:text-sm `}>
                                <svg width="15" height="12" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0.403226 0.964382C0.260562 1.16893 0.348101 1.44059 0.560148 1.57186L7.10515 5.62353C7.34703 5.77327 7.65281 5.77327 7.89469 5.62353L14.4398 1.57179C14.6519 1.44052 14.7394 1.16885 14.5967 0.964299C14.1901 0.381386 13.5146 0 12.75 0H2.25C1.48536 0 0.809808 0.381422 0.403226 0.964382Z" fill="#6F767E" />
                                    <path d="M15 3.88674C15 3.49498 14.5699 3.2554 14.2368 3.4616L8.68422 6.89893C7.95858 7.34813 7.04126 7.34813 6.31562 6.89893L0.763178 3.4617C0.430082 3.2555 0 3.49508 0 3.88683V9.75C0 10.9926 1.00736 12 2.25 12H12.75C13.9926 12 15 10.9926 15 9.75V3.88674Z" fill="#6F767E" />
                                </svg>
                                {agent.email}
                            </div>
                        )}
                        {agent.location.length && agent.location && (
                            <div className={`flex items-center gap-2.5 ${isDarkMode ? "text-[#6F767E]" : "text-[#808191]"} font-normal text-xs md:text-sm `}>
                                <svg width="12" height="15" viewBox="0 0 12 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M12 6.00441C12 7.42437 11.5075 8.72921 10.684 9.75716H10.6875C10.6875 9.75716 8.60223 12.5497 6.98682 14.527C6.47145 15.1579 5.52874 15.1576 5.01367 14.5265C3.40341 12.5535 1.32083 9.76322 1.32083 9.76322L1.31597 9.75716C0.492539 8.72921 0 7.42437 0 6.00441C0 2.68827 2.68629 0 6 0C9.31371 0 12 2.68827 12 6.00441ZM8.24036 5.97842C8.24036 7.21659 7.23736 8.22032 6.0001 8.22032C4.76284 8.22032 3.75984 7.21659 3.75984 5.97842C3.75984 4.74025 4.76284 3.73651 6.0001 3.73651C7.23736 3.73651 8.24036 4.74025 8.24036 5.97842Z" fill="#6F767E" />
                                </svg>
                                {agent.location}
                            </div>
                        )}
                        {agent.phone.length && agent.phone && (
                            <div className={`flex items-center gap-2.5 ${isDarkMode ? "text-[#6F767E]" : "text-[#808191]"} font-normal text-xs md:text-sm `}>
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0.324546 4.69457C-0.502947 3.03392 0.331984 1.20118 1.92298 0.246581C2.68897 -0.213016 3.67896 -0.013558 4.20722 0.706801L5.37922 2.30498C5.87805 2.98521 5.95451 3.8873 5.57727 4.64178L5.26997 5.25637C5.18102 5.43428 5.16695 5.64009 5.25795 5.81696C5.42373 6.13921 5.77677 6.71029 6.45687 7.39039C7.13696 8.07048 7.70804 8.42352 8.03029 8.58931C8.20717 8.6803 8.41297 8.66624 8.59088 8.57728L9.20547 8.26999C9.95995 7.89275 10.862 7.9692 11.5423 8.46803L13.1405 9.64003C13.8608 10.1683 14.0603 11.1583 13.6007 11.9243C12.6461 13.5153 10.8133 14.3502 9.15268 13.5227C7.75309 12.8253 5.96459 11.6711 4.07038 9.77687C2.17617 7.88266 1.02196 6.09417 0.324546 4.69457Z" fill="#6F767E" />
                                </svg>
                                {agent.phone}
                            </div>
                        )}
                        {agent.properties > 0 && agent.properties && (
                            <div className={`flex items-center gap-2.5 ${isDarkMode ? "text-[#6F767E]" : "text-[#808191]"} font-normal text-xs md:text-sm `}>
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M3.20429 1.19329C2.20267 1.44369 1.5 2.34366 1.5 3.37611V12.8694H0.75C0.335786 12.8694 0 13.2052 0 13.6194C0 14.0336 0.335786 14.3694 0.75 14.3694H14.25C14.6642 14.3694 15 14.0336 15 13.6194C15 13.2052 14.6642 12.8694 14.25 12.8694H13.5V6.11938C13.5 4.87674 12.4926 3.86938 11.25 3.86938H10.5V2.25111C10.5 0.787323 9.12438 -0.286732 7.7043 0.0682877L3.20429 1.19329ZM12 6.11938V12.8694H10.5V5.36938H11.25C11.6642 5.36938 12 5.70517 12 6.11938ZM5.25 9.86938C4.83579 9.86938 4.5 10.2052 4.5 10.6194C4.5 11.0336 4.83579 11.3694 5.25 11.3694H6.75C7.16421 11.3694 7.5 11.0336 7.5 10.6194C7.5 10.2052 7.16421 9.86938 6.75 9.86938H5.25ZM4.5 7.61938C4.5 7.20517 4.83579 6.86938 5.25 6.86938H6.75C7.16421 6.86938 7.5 7.20517 7.5 7.61938C7.5 8.0336 7.16421 8.36938 6.75 8.36938H5.25C4.83579 8.36938 4.5 8.0336 4.5 7.61938ZM5.25 3.86938C4.83579 3.86938 4.5 4.20517 4.5 4.61938C4.5 5.0336 4.83579 5.36938 5.25 5.36938H6.75C7.16421 5.36938 7.5 5.0336 7.5 4.61938C7.5 4.20517 7.16421 3.86938 6.75 3.86938H5.25Z" fill="#6F767E" />
                                </svg>
                                {agent.properties} Properties
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="md:hidden grid grid-cols-1 xl:grid-cols-2 gap-[5px]  gap-x-5 xl:gap-x-[158px] xl:gap-y-5">
                {agent.email.length && agent.email && (
                    <div className={`flex items-center gap-2.5 ${isDarkMode ? "text-[#6F767E]" : "text-[#808191]"} font-normal text-xs md:text-sm `}>
                        <svg width="15" height="12" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.403226 0.964382C0.260562 1.16893 0.348101 1.44059 0.560148 1.57186L7.10515 5.62353C7.34703 5.77327 7.65281 5.77327 7.89469 5.62353L14.4398 1.57179C14.6519 1.44052 14.7394 1.16885 14.5967 0.964299C14.1901 0.381386 13.5146 0 12.75 0H2.25C1.48536 0 0.809808 0.381422 0.403226 0.964382Z" fill="#6F767E" />
                            <path d="M15 3.88674C15 3.49498 14.5699 3.2554 14.2368 3.4616L8.68422 6.89893C7.95858 7.34813 7.04126 7.34813 6.31562 6.89893L0.763178 3.4617C0.430082 3.2555 0 3.49508 0 3.88683V9.75C0 10.9926 1.00736 12 2.25 12H12.75C13.9926 12 15 10.9926 15 9.75V3.88674Z" fill="#6F767E" />
                        </svg>
                        {agent.email}
                    </div>
                )}
                {agent.location.length && agent.location && (
                    <div className={`flex items-center gap-2.5 ${isDarkMode ? "text-[#6F767E]" : "text-[#808191]"} font-normal text-xs md:text-sm `}>
                        <svg width="12" height="15" viewBox="0 0 12 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M12 6.00441C12 7.42437 11.5075 8.72921 10.684 9.75716H10.6875C10.6875 9.75716 8.60223 12.5497 6.98682 14.527C6.47145 15.1579 5.52874 15.1576 5.01367 14.5265C3.40341 12.5535 1.32083 9.76322 1.32083 9.76322L1.31597 9.75716C0.492539 8.72921 0 7.42437 0 6.00441C0 2.68827 2.68629 0 6 0C9.31371 0 12 2.68827 12 6.00441ZM8.24036 5.97842C8.24036 7.21659 7.23736 8.22032 6.0001 8.22032C4.76284 8.22032 3.75984 7.21659 3.75984 5.97842C3.75984 4.74025 4.76284 3.73651 6.0001 3.73651C7.23736 3.73651 8.24036 4.74025 8.24036 5.97842Z" fill="#6F767E" />
                        </svg>
                        {agent.location}
                    </div>
                )}
                {agent.phone.length && agent.phone && (
                    <div className={`flex items-center gap-2.5 ${isDarkMode ? "text-[#6F767E]" : "text-[#808191]"} font-normal text-xs md:text-sm `}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.324546 4.69457C-0.502947 3.03392 0.331984 1.20118 1.92298 0.246581C2.68897 -0.213016 3.67896 -0.013558 4.20722 0.706801L5.37922 2.30498C5.87805 2.98521 5.95451 3.8873 5.57727 4.64178L5.26997 5.25637C5.18102 5.43428 5.16695 5.64009 5.25795 5.81696C5.42373 6.13921 5.77677 6.71029 6.45687 7.39039C7.13696 8.07048 7.70804 8.42352 8.03029 8.58931C8.20717 8.6803 8.41297 8.66624 8.59088 8.57728L9.20547 8.26999C9.95995 7.89275 10.862 7.9692 11.5423 8.46803L13.1405 9.64003C13.8608 10.1683 14.0603 11.1583 13.6007 11.9243C12.6461 13.5153 10.8133 14.3502 9.15268 13.5227C7.75309 12.8253 5.96459 11.6711 4.07038 9.77687C2.17617 7.88266 1.02196 6.09417 0.324546 4.69457Z" fill="#6F767E" />
                        </svg>
                        {agent.phone}
                    </div>
                )}
                {agent.properties > 0 && agent.properties && (
                    <div className={`flex items-center gap-2.5 ${isDarkMode ? "text-[#6F767E]" : "text-[#808191]"} font-normal text-xs md:text-sm `}>
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M3.20429 1.19329C2.20267 1.44369 1.5 2.34366 1.5 3.37611V12.8694H0.75C0.335786 12.8694 0 13.2052 0 13.6194C0 14.0336 0.335786 14.3694 0.75 14.3694H14.25C14.6642 14.3694 15 14.0336 15 13.6194C15 13.2052 14.6642 12.8694 14.25 12.8694H13.5V6.11938C13.5 4.87674 12.4926 3.86938 11.25 3.86938H10.5V2.25111C10.5 0.787323 9.12438 -0.286732 7.7043 0.0682877L3.20429 1.19329ZM12 6.11938V12.8694H10.5V5.36938H11.25C11.6642 5.36938 12 5.70517 12 6.11938ZM5.25 9.86938C4.83579 9.86938 4.5 10.2052 4.5 10.6194C4.5 11.0336 4.83579 11.3694 5.25 11.3694H6.75C7.16421 11.3694 7.5 11.0336 7.5 10.6194C7.5 10.2052 7.16421 9.86938 6.75 9.86938H5.25ZM4.5 7.61938C4.5 7.20517 4.83579 6.86938 5.25 6.86938H6.75C7.16421 6.86938 7.5 7.20517 7.5 7.61938C7.5 8.0336 7.16421 8.36938 6.75 8.36938H5.25C4.83579 8.36938 4.5 8.0336 4.5 7.61938ZM5.25 3.86938C4.83579 3.86938 4.5 4.20517 4.5 4.61938C4.5 5.0336 4.83579 5.36938 5.25 5.36938H6.75C7.16421 5.36938 7.5 5.0336 7.5 4.61938C7.5 4.20517 7.16421 3.86938 6.75 3.86938H5.25Z" fill="#6F767E" />
                        </svg>
                        {agent.properties} Properties
                    </div>
                )}
            </div>
        </div>
    );
}
