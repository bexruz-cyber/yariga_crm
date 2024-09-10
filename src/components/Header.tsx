import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import profile_img from "../img/profile_image.png";



import { NotificationData } from '../DB/NotificationDB';

interface HeaderProps {
    modalIsOpen: boolean;
    setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isDarkMode: boolean;
    setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
    editProfile: boolean;
    setEditProfile: React.Dispatch<React.SetStateAction<boolean>>;
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

interface NotificationData {
    id: number;
    img: string;
    title: string;
    description: string;
    time: string;
}

export default function Header({ modalIsOpen, setModalIsOpen, isDarkMode, setIsDarkMode, editProfile, setEditProfile, setIsLoading }: HeaderProps) {
    const [name, setName] = useState<string>(localStorage.getItem("name") || "");
    const [lastName, setLastName] = useState<string>(localStorage.getItem("lastname") || "");
    const [userEmail, setUserEmail] = useState<string>(localStorage.getItem("email") || "");
    const [userPassword, setUserPassword] = useState<string>(localStorage.getItem("password") || "");
    const navigate = useNavigate()
    const [notificationsListHandler, setNotificationsListHandler] = useState(false);
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [modal, setModal] = useState(false);
    const [step, setStep] = useState<number>(1); // State to manage form steps
    const [error, setError] = useState<string | null>(null); // Error state
    const notifications: NotificationData[] = NotificationData;

    const handleSubmit = (e: FormEvent) => {
        try {
            e.preventDefault();
            if (step === 1) {
                // Validate email and password
                if (userPassword.length < 8 || userEmail.length === 0) {
                    setError("Enter the full email and password and the password must not be less than 8 characters.");
                    return;
                }
                // Move to next step
                setError(null);
                setStep(2);
            } else if (step === 2) {
                // Validate name and lastname
                if (name.length === 0 || lastName.length === 0) {
                    setError("Enter the full first and last name.");
                    return;
                }


                // Save data to localStorage
                localStorage.setItem("email", userEmail);
                localStorage.setItem("password", userPassword);
                localStorage.setItem("name", name);
                localStorage.setItem("lastname", lastName);


                setEditProfile(false)
                setError(null); // Clear error on successful submission
                // After form submission, handle any further actions like logging in the user
                navigate("/");
                setIsLoading(true)
            }

        }
        catch (error) {
            console.error('Autentifikatsiya tekshirishda xatolik', error);
            navigate("/login");
        }
        finally {
            setIsLoading(false);
        }
    };

    const modalhandler = () => {
        setModal(!modal);
        setModalIsOpen(false);
        setNotificationsListHandler(false)
    };

    const modalclosehandler = () => {
        setModal(false);
    };

    const toggleModal = () => {
        setModalIsOpen(!modalIsOpen);
        setNotificationsListHandler(false)
        setModal(false);
    };

    const modalsClose = () => {
        setModalIsOpen(false);
        setModal(false);
        setNotificationsListHandler(false)
        setNotificationsListHandler(false);
        setEditProfile(false)
    }

    const toggleNotificationsListHandler = () => {
        setNotificationsListHandler(!notificationsListHandler);
        setModal(false);
        setModalIsOpen(false);
    }

    const notificationClose = () => {
        setNotificationsListHandler(false);
        navigate("/message")
    }

    const toggleDarkMode = () => {
        setIsDarkMode(prevState => !prevState);
        setModal(false);
    };

    const editprofileHandler = () => {
        setEditProfile(true)
        setModal(false)
    }

    const logautHandler = () => {
        localStorage.removeItem("email");
        localStorage.removeItem("password");
        localStorage.removeItem("name");
        localStorage.removeItem("lastname");
        setModal(false);
        window.location.reload();
    }

    const toggleSearch = () => {
        setIsSearchVisible(prevState => !prevState);
    };


    return (
        <>

            <header className={`fixed z-40 top-0 left-0 w-full transition-all duration-300 py-4 pl-5 max-lg:pr-10 pr-5 ${isDarkMode ? 'bg-[#1A1D1F] text-[#EFEFEF]' : 'bg-[#FCFCFC] text-[#11142D]'}`}>
                <div className="flex items-center relative w-full">
                    <Link to="/" className='max-md:hidden lg:mr-[82px] mr-5'>
                        <svg width="173" height="36" viewBox="0 0 173 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M29.8398 16.9045C30.0314 17.2378 30.1322 17.6156 30.1322 18C30.1322 18.3845 30.0314 18.7622 29.8398 19.0955L25.531 26.5289C25.3385 26.8608 25.0622 27.1363 24.7298 27.3279C24.3975 27.5194 24.0206 27.6204 23.637 27.6206L15.0656 27.6206C14.6846 27.6177 14.3109 27.5155 13.9815 27.324C13.652 27.1326 13.3782 26.8585 13.187 26.5289L8.87818 19.0955C8.68663 18.7622 8.58582 18.3845 8.58582 18C8.58582 17.6156 8.68663 17.2378 8.87818 16.9045L11.2583 12.8001L16.5546 21.8575C16.6418 22.0126 16.7691 22.1413 16.9232 22.2302C17.0772 22.3191 17.2524 22.3649 17.4302 22.3628L21.2877 22.3628C21.4656 22.3649 21.6408 22.3191 21.7948 22.2302C21.9489 22.1413 22.0762 22.0126 22.1634 21.8575L24.0921 18.4899C24.1795 18.3386 24.2255 18.167 24.2255 17.9923C24.2255 17.8176 24.1795 17.646 24.0921 17.4947L15.3973 2.45046C15.0956 1.92868 14.662 1.49541 14.14 1.19412C13.618 0.892825 13.0259 0.7341 12.4232 0.733871L11.644 0.733871C10.9544 0.733608 10.2769 0.914936 9.6797 1.25961C9.08244 1.60428 8.58648 2.10015 8.24169 2.69734L0.526706 16.0404C0.181668 16.6372 -7.84862e-07 17.3145 -7.54727e-07 18.0039C-7.24593e-07 18.6933 0.181668 19.3705 0.526706 19.9673L8.2417 33.3104C8.58697 33.9069 9.08314 34.402 9.68036 34.746C10.2776 35.0899 10.9548 35.2707 11.644 35.27L27.074 35.27C27.7636 35.2703 28.441 35.089 29.0383 34.7443C29.6355 34.3996 30.1315 33.9037 30.4763 33.3066L38.1913 19.9635C38.5363 19.3666 38.718 18.6894 38.718 18C38.718 17.3106 38.5363 16.6334 38.1913 16.0366L30.4763 2.69348C30.1315 2.09629 29.6355 1.60042 29.0383 1.25575C28.441 0.911074 27.7636 0.729754 27.074 0.730014L20.5162 0.730014L29.8398 16.9045Z" fill="#475BE8" />
                            <path d="M56.843 28V20.625L50.718 10H54.2305L58.368 17.175L62.493 10H66.0055L59.893 20.625V28H56.843ZM69.5243 28.375C68.5493 28.375 67.7243 28.1917 67.0493 27.825C66.3743 27.45 65.8618 26.9542 65.5118 26.3375C65.1701 25.7208 64.9993 25.0417 64.9993 24.3C64.9993 23.65 65.1076 23.0667 65.3243 22.55C65.5409 22.025 65.8743 21.575 66.3243 21.2C66.7743 20.8167 67.3576 20.5042 68.0743 20.2625C68.6159 20.0875 69.2493 19.9292 69.9743 19.7875C70.7076 19.6458 71.4993 19.5167 72.3493 19.4C73.2076 19.275 74.1034 19.1417 75.0368 19L73.9618 19.6125C73.9701 18.6792 73.7618 17.9917 73.3368 17.55C72.9118 17.1083 72.1951 16.8875 71.1868 16.8875C70.5784 16.8875 69.9909 17.0292 69.4243 17.3125C68.8576 17.5958 68.4618 18.0833 68.2368 18.775L65.4868 17.9125C65.8201 16.7708 66.4534 15.8542 67.3868 15.1625C68.3284 14.4708 69.5951 14.125 71.1868 14.125C72.3868 14.125 73.4409 14.3208 74.3493 14.7125C75.2659 15.1042 75.9451 15.7458 76.3868 16.6375C76.6284 17.1125 76.7743 17.6 76.8243 18.1C76.8743 18.5917 76.8993 19.1292 76.8993 19.7125V28H74.2618V25.075L74.6993 25.55C74.0909 26.525 73.3784 27.2417 72.5618 27.7C71.7534 28.15 70.7409 28.375 69.5243 28.375ZM70.1243 25.975C70.8076 25.975 71.3909 25.8542 71.8743 25.6125C72.3576 25.3708 72.7409 25.075 73.0243 24.725C73.3159 24.375 73.5118 24.0458 73.6118 23.7375C73.7701 23.3542 73.8576 22.9167 73.8743 22.425C73.8993 21.925 73.9118 21.5208 73.9118 21.2125L74.8368 21.4875C73.9284 21.6292 73.1493 21.7542 72.4993 21.8625C71.8493 21.9708 71.2909 22.075 70.8243 22.175C70.3576 22.2667 69.9451 22.3708 69.5868 22.4875C69.2368 22.6125 68.9409 22.7583 68.6993 22.925C68.4576 23.0917 68.2701 23.2833 68.1368 23.5C68.0118 23.7167 67.9493 23.9708 67.9493 24.2625C67.9493 24.5958 68.0326 24.8917 68.1993 25.15C68.3659 25.4 68.6076 25.6 68.9243 25.75C69.2493 25.9 69.6493 25.975 70.1243 25.975ZM80.1536 28V14.5H82.8161V17.7875L82.4911 17.3625C82.6577 16.9125 82.8786 16.5042 83.1536 16.1375C83.4369 15.7625 83.7744 15.4542 84.1661 15.2125C84.4994 14.9875 84.8661 14.8125 85.2661 14.6875C85.6744 14.5542 86.0911 14.475 86.5161 14.45C86.9411 14.4167 87.3536 14.4333 87.7536 14.5V17.3125C87.3536 17.1958 86.8911 17.1583 86.3661 17.2C85.8494 17.2417 85.3827 17.3875 84.9661 17.6375C84.5494 17.8625 84.2077 18.15 83.9411 18.5C83.6827 18.85 83.4911 19.25 83.3661 19.7C83.2411 20.1417 83.1786 20.6208 83.1786 21.1375V28H80.1536ZM90.3889 12.45V9.6875H93.4014V12.45H90.3889ZM90.3889 28V14.5H93.4014V28H90.3889ZM102.821 34.375C102.071 34.375 101.35 34.2583 100.658 34.025C99.9749 33.7917 99.3583 33.4542 98.8083 33.0125C98.2583 32.5792 97.8083 32.0542 97.4583 31.4375L100.233 30.0625C100.492 30.5542 100.854 30.9167 101.321 31.15C101.796 31.3917 102.3 31.5125 102.833 31.5125C103.458 31.5125 104.017 31.4 104.508 31.175C105 30.9583 105.379 30.6333 105.646 30.2C105.921 29.775 106.05 29.2417 106.033 28.6V24.7625H106.408V14.5H109.046V28.65C109.046 28.9917 109.029 29.3167 108.996 29.625C108.971 29.9417 108.925 30.25 108.858 30.55C108.658 31.425 108.275 32.1417 107.708 32.7C107.142 33.2667 106.437 33.6875 105.596 33.9625C104.762 34.2375 103.837 34.375 102.821 34.375ZM102.558 28.375C101.317 28.375 100.233 28.0625 99.3083 27.4375C98.3833 26.8125 97.6666 25.9625 97.1583 24.8875C96.6499 23.8125 96.3958 22.6 96.3958 21.25C96.3958 19.8833 96.6499 18.6667 97.1583 17.6C97.6749 16.525 98.4041 15.6792 99.3458 15.0625C100.287 14.4375 101.396 14.125 102.671 14.125C103.954 14.125 105.029 14.4375 105.896 15.0625C106.771 15.6792 107.433 16.525 107.883 17.6C108.333 18.675 108.558 19.8917 108.558 21.25C108.558 22.5917 108.333 23.8042 107.883 24.8875C107.433 25.9625 106.762 26.8125 105.871 27.4375C104.979 28.0625 103.875 28.375 102.558 28.375ZM103.021 25.675C103.829 25.675 104.479 25.4917 104.971 25.125C105.471 24.75 105.833 24.2292 106.058 23.5625C106.292 22.8958 106.408 22.125 106.408 21.25C106.408 20.3667 106.292 19.5958 106.058 18.9375C105.833 18.2708 105.479 17.7542 104.996 17.3875C104.512 17.0125 103.887 16.825 103.121 16.825C102.312 16.825 101.646 17.025 101.121 17.425C100.596 17.8167 100.208 18.35 99.9583 19.025C99.7083 19.6917 99.5833 20.4333 99.5833 21.25C99.5833 22.075 99.7041 22.825 99.9458 23.5C100.196 24.1667 100.575 24.6958 101.083 25.0875C101.592 25.4792 102.237 25.675 103.021 25.675ZM116.326 28.375C115.351 28.375 114.526 28.1917 113.851 27.825C113.176 27.45 112.664 26.9542 112.314 26.3375C111.972 25.7208 111.801 25.0417 111.801 24.3C111.801 23.65 111.909 23.0667 112.126 22.55C112.343 22.025 112.676 21.575 113.126 21.2C113.576 20.8167 114.159 20.5042 114.876 20.2625C115.418 20.0875 116.051 19.9292 116.776 19.7875C117.509 19.6458 118.301 19.5167 119.151 19.4C120.009 19.275 120.905 19.1417 121.839 19L120.764 19.6125C120.772 18.6792 120.564 17.9917 120.139 17.55C119.714 17.1083 118.997 16.8875 117.989 16.8875C117.38 16.8875 116.793 17.0292 116.226 17.3125C115.659 17.5958 115.264 18.0833 115.039 18.775L112.289 17.9125C112.622 16.7708 113.255 15.8542 114.189 15.1625C115.13 14.4708 116.397 14.125 117.989 14.125C119.189 14.125 120.243 14.3208 121.151 14.7125C122.068 15.1042 122.747 15.7458 123.189 16.6375C123.43 17.1125 123.576 17.6 123.626 18.1C123.676 18.5917 123.701 19.1292 123.701 19.7125V28H121.064V25.075L121.501 25.55C120.893 26.525 120.18 27.2417 119.364 27.7C118.555 28.15 117.543 28.375 116.326 28.375ZM116.926 25.975C117.609 25.975 118.193 25.8542 118.676 25.6125C119.159 25.3708 119.543 25.075 119.826 24.725C120.118 24.375 120.314 24.0458 120.414 23.7375C120.572 23.3542 120.659 22.9167 120.676 22.425C120.701 21.925 120.714 21.5208 120.714 21.2125L121.639 21.4875C120.73 21.6292 119.951 21.7542 119.301 21.8625C118.651 21.9708 118.093 22.075 117.626 22.175C117.159 22.2667 116.747 22.3708 116.389 22.4875C116.039 22.6125 115.743 22.7583 115.501 22.925C115.259 23.0917 115.072 23.2833 114.939 23.5C114.814 23.7167 114.751 23.9708 114.751 24.2625C114.751 24.5958 114.834 24.8917 115.001 25.15C115.168 25.4 115.409 25.6 115.726 25.75C116.051 25.9 116.451 25.975 116.926 25.975Z" fill="currentColor" />
                        </svg>
                    </Link>
                    <button onClick={toggleModal} className='md:hidden mr-2.5'>
                        {modalIsOpen ?
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>

                            : (
                                <div className="w-6">
                                    <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0 14H18V11.7895H0V14ZM0 8.10526H18V5.89474H0V8.10526ZM0 0V2.21053H18V0H0Z" fill="currentColor" />
                                    </svg>
                                </div>
                            )}


                    </button>
                    <div className={`md:max-w-[405px] mr-5 w-full  flex items-center gap-x-2 rounded-lg p-2.5 
                    ${isSearchVisible ? `${isDarkMode ? 'bg-[#111315]' : 'bg-[#F4F4F4]'}` : "bg-transparent"} 
                    ${isDarkMode ? 'md:bg-[#111315]' : 'md:bg-[#F4F4F4]'} `}>
                        <button className='search_btn' onClick={toggleSearch}>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.803 13.8637C13.0959 14.1566 13.5708 14.1566 13.8637 13.8637C14.1566 13.5708 14.1566 13.0959 13.8637 12.803L12.803 13.8637ZM11.25 7C11.25 9.34721 9.34721 11.25 7 11.25V12.75C10.1756 12.75 12.75 10.1756 12.75 7H11.25ZM7 11.25C4.65279 11.25 2.75 9.34721 2.75 7H1.25C1.25 10.1756 3.82436 12.75 7 12.75V11.25ZM2.75 7C2.75 4.65279 4.65279 2.75 7 2.75V1.25C3.82436 1.25 1.25 3.82436 1.25 7H2.75ZM7 2.75C9.34721 2.75 11.25 4.65279 11.25 7H12.75C12.75 3.82436 10.1756 1.25 7 1.25V2.75ZM13.8637 12.803L11.0719 10.0113L10.0113 11.0719L12.803 13.8637L13.8637 12.803Z" fill="#6F767E" />
                            </svg>
                        </button>
                        {isSearchVisible && (
                            <input
                                type="search"
                                name="search"
                                id="search"
                                className={`w-full lg:hidden leading-[18px] placeholder:leading-[18px] outline-none bg-transparent 
                                ${isDarkMode ? 'text-[#66687B] placeholder:text-[#6F767E]' :
                                        'text-[#66687B] placeholder:text-[#66687B]'} 
                                placeholder:font-normal placeholder:text-xs`}
                                placeholder='Search Property, Customer etc'
                            />
                        )}
                        <input
                            type="search"
                            name="search"
                            id="search"
                            className={`w-[361px] max-lg:hidden leading-[18px] placeholder:leading-[18px] outline-none bg-transparent ${isDarkMode ? 'text-[#66687B] placeholder:text-[#6F767E]' : 'text-[#66687B] placeholder:text-[#66687B]'} placeholder:font-normal placeholder:text-xs`}
                            placeholder='Search Property, Customer etc'
                        />
                    </div>
                    <div className={`${isSearchVisible ? "max-md:hidden" : "max-md:flex "} md:flex ml-auto items-center gap-x-5`}>
                        <button onClick={toggleNotificationsListHandler}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M2 16.5959C2 16.2151 2.15471 15.8506 2.42864 15.586L3.45759 14.5922C3.84928 14.2139 4.06977 13.6922 4.06814 13.1476L4.05867 9.9946C4.04543 5.58319 7.61789 2 12.0293 2C16.4314 2 20 5.56859 20 9.97067L20 13.1716C20 13.702 20.2107 14.2107 20.5858 14.5858L21.5858 15.5858C21.851 15.851 22 16.2107 22 16.5858C22 17.3668 21.3668 18 20.5858 18H16C16 20.2091 14.2091 22 12 22C9.79086 22 8 20.2091 8 18H3.40408C2.62863 18 2 17.3714 2 16.5959ZM10 18C10 19.1046 10.8954 20 12 20C13.1046 20 14 19.1046 14 18H10ZM18 13.1716C18 14.2324 18.4214 15.2499 19.1716 16L4.87851 16C5.64222 15.246 6.07136 14.2161 6.06813 13.1416L6.05867 9.9886C6.04875 6.6841 8.7248 4 12.0293 4C15.3268 4 18 6.67316 18 9.97067L18 13.1716Z" fill="#6F767E" />
                                <circle cx="18.5" cy="5.5" r="3.5" fill="#EB5757" />
                            </svg>
                        </button>
                        <div className="flex items-center gap-x-2.5">
                            <img onClick={() => navigate("/profileDashboard")} src={profile_img} alt="profile_img" className='w-10 h-10 object-cover' />
                            <div className="max-md:hidden min-w-[170px]">
                                <h2 className="font-semibold text-sm">{name} {lastName}</h2>
                                <p className="font-normal text-sm">Company Manager</p>
                            </div>
                            <button onClick={modalhandler} className='px-[8.25px] py-[3px]'>
                                <svg width="4" height="14" viewBox="0 0 4 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1.25 7C1.25 7.41421 1.58579 7.75 2 7.75C2.41421 7.75 2.75 7.41421 2.75 7C2.75 6.58579 2.41421 6.25 2 6.25C1.58579 6.25 1.25 6.58579 1.25 7Z" stroke="#6F767E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M1.25 12.25C1.25 12.6642 1.58579 13 2 13C2.41421 13 2.75 12.6642 2.75 12.25C2.75 11.8358 2.41421 11.5 2 11.5C1.58579 11.5 1.25 11.8358 1.25 12.25Z" stroke="#6F767E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M1.25 1.75C1.25 2.16421 1.58579 2.5 2 2.5C2.41421 2.5 2.75 2.16421 2.75 1.75C2.75 1.33579 2.41421 1 2 1C1.58579 1 1.25 1.33579 1.25 1.75Z" stroke="#6F767E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className={`modal ${modal ? "top-[80px] md:top-[81px] opacity-100" : "-top-full opacity-0"}  fixed z-50 right-[18px] md:right-12 rounded-[10px] transition-all duration-300  ${isDarkMode ? "dark:bg-[#1A1D1F]" : "bg-[#FCFCFC]"}  max-w-[192px] w-full p-2.5`}>
                <ul className=''>
                    <li className='p-2.5'>
                        <button onClick={editprofileHandler} className='flex items-center gap-2.5 leading-[22px] text-[#808191] dark:hover:text-[#475BE8] transition-all duration-300'>
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M16.5 9C16.5 13.1421 13.1421 16.5 9 16.5C4.85786 16.5 1.5 13.1421 1.5 9C1.5 4.85786 4.85786 1.5 9 1.5C13.1421 1.5 16.5 4.85786 16.5 9ZM13.2852 12.3004C13.5312 12.5513 13.5312 12.9488 13.2852 13.1997C12.1963 14.3107 10.6786 15 9.00005 15C7.3214 15 5.80375 14.3106 4.71477 13.1996C4.46884 12.9487 4.46885 12.5512 4.71478 12.3003C5.80376 11.1893 7.32136 10.5 8.99997 10.5C10.6786 10.5 12.1963 11.1894 13.2852 12.3004ZM9 9C10.2426 9 11.25 7.99264 11.25 6.75C11.25 5.50736 10.2426 4.5 9 4.5C7.75736 4.5 6.75 5.50736 6.75 6.75C6.75 7.99264 7.75736 9 9 9Z" fill="currentColor" />
                            </svg>
                            Edit Profile
                        </button>
                    </li>
                    <li className='p-2.5'>
                        <button onClick={modalclosehandler} className='flex items-center gap-2.5 leading-[22px] text-[#808191] dark:hover:text-[#475BE8] transition-all duration-300'>
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M6.82054 2.64765C6.68386 3.0577 6.37187 3.38004 5.99424 3.59032C5.9355 3.62302 5.87735 3.65665 5.81981 3.6912C5.44879 3.91393 5.01315 4.02329 4.58919 3.93653L3.68786 3.75209C3.05532 3.62265 2.41093 3.91249 2.0881 4.47164L1.62237 5.27831C1.29954 5.83746 1.37073 6.54045 1.7991 7.02352L2.41037 7.71286C2.69681 8.03587 2.8206 8.46665 2.81376 8.89832C2.81268 8.96607 2.81268 9.03389 2.81376 9.10164C2.82059 9.53331 2.6968 9.96408 2.41037 10.2871L1.7991 10.9764C1.37073 11.4595 1.29954 12.1625 1.62237 12.7216L2.0881 13.5283C2.41093 14.0875 3.05532 14.3773 3.68786 14.2479L4.58913 14.0634C5.0131 13.9767 5.44874 14.086 5.81977 14.3088C5.87732 14.3433 5.93549 14.377 5.99424 14.4097C6.37187 14.62 6.68386 14.9423 6.82054 15.3523L7.1112 16.2243C7.31537 16.8369 7.88858 17.25 8.53423 17.25H9.4657C10.1113 17.25 10.6846 16.8369 10.8887 16.2243L11.1794 15.3523C11.3161 14.9423 11.6281 14.62 12.0057 14.4097C12.0644 14.377 12.1226 14.3433 12.1802 14.3088C12.5512 14.086 12.9868 13.9767 13.4108 14.0634L14.312 14.2479C14.9446 14.3773 15.589 14.0875 15.9118 13.5283L16.3775 12.7216C16.7003 12.1625 16.6292 11.4595 16.2008 10.9764L15.5896 10.2871C15.3031 9.96412 15.1793 9.53335 15.1862 9.10168C15.1872 9.0339 15.1872 8.96606 15.1862 8.89828C15.1793 8.46661 15.3031 8.03583 15.5896 7.71282L16.2008 7.02352C16.6292 6.54045 16.7003 5.83746 16.3775 5.27832L15.9118 4.47164C15.589 3.91249 14.9446 3.62265 14.312 3.75209L13.4107 3.93653C12.9868 4.02328 12.5511 3.91392 12.1801 3.69119C12.1226 3.65665 12.0644 3.62302 12.0057 3.59032C11.6281 3.38004 11.3161 3.0577 11.1794 2.64765L10.8887 1.77566C10.6846 1.16314 10.1113 0.75 9.4657 0.75H8.53423C7.88858 0.75 7.31537 1.16315 7.1112 1.77566L6.82054 2.64765ZM11.25 9C11.25 10.2426 10.2427 11.25 9.00001 11.25C7.75737 11.25 6.75001 10.2426 6.75001 9C6.75001 7.75736 7.75737 6.75 9.00001 6.75C10.2427 6.75 11.25 7.75736 11.25 9Z" fill="currentColor" />
                            </svg>
                            Settings
                        </button>
                    </li>
                    <li className='p-2.5'>
                        <button onClick={logautHandler} className='flex items-center gap-2.5 leading-[22px] text-[#808191] dark:hover:text-[#475BE8] transition-all duration-300'>
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 1.5C10.2426 1.5 11.25 2.50736 11.25 3.75V8.25H7.5C7.08579 8.25 6.75 8.58579 6.75 9C6.75 9.41421 7.08579 9.75 7.5 9.75H11.25V14.25C11.25 15.4926 10.2426 16.5 9 16.5H4.5C3.25736 16.5 2.25 15.4926 2.25 14.25V3.75C2.25 2.50736 3.25736 1.5 4.5 1.5H9Z" fill="currentColor" />
                                <path d="M11.25 9.75L13.5643 9.75L12.2197 11.0947C11.9268 11.3876 11.9268 11.8624 12.2197 12.1553C12.5126 12.4482 12.9874 12.4482 13.2803 12.1553L15.375 10.0607C15.9608 9.47487 15.9608 8.52513 15.375 7.93934L13.2803 5.84467C12.9874 5.55178 12.5126 5.55178 12.2197 5.84467C11.9268 6.13756 11.9268 6.61244 12.2197 6.90533L13.5643 8.25L11.25 8.25V9.75Z" fill="currentColor" />
                            </svg>
                            Logout
                        </button>
                    </li>
                    <li className='p-2.5'>
                        <button onClick={toggleDarkMode} className='flex items-center gap-2.5 leading-[22px] text-[#808191] dark:hover:text-[#475BE8] transition-all duration-300'>
                            <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M0.5 6C0.5 3.10051 2.85051 0.75 5.75 0.75H10.25C13.1495 0.75 15.5 3.10051 15.5 6C15.5 8.8995 13.1495 11.25 10.25 11.25H5.75C2.8505 11.25 0.5 8.8995 0.5 6ZM10.25 3.375C8.80025 3.375 7.625 4.55025 7.625 6C7.625 7.44975 8.80025 8.625 10.25 8.625C11.6997 8.625 12.875 7.44975 12.875 6C12.875 4.55025 11.6997 3.375 10.25 3.375Z" fill="currentColor" />
                            </svg>
                            {isDarkMode ? "Dark Mode" : "Light Mode"}
                        </button>
                    </li>
                </ul>
            </div>

            {/* NOT */}
            <div className={`${notificationsListHandler ? "top-[80px] md:top-[81px] opacity-100" : "-top-[1000%] opacity-1"}   transition-all duration-300 w-full md:max-w-[411px]  max-md:px-[18px] fixed 
              right-0 lg:right-11  z-50    `}>
                <div className={`${isDarkMode ? 'bg-[#1A1D1F]' : 'bg-[#FCFCFC]'}   overflow-y-auto 2xl:max-h-[705px] md:max-h-[500px]   h-full  rounded-[10px] flex flex-col gap-y-5 relative w-full py-[30px] max-md:pb-[100px] px-5`}>
                    {notifications.map(notification => (
                        <div onClick={notificationClose} className={`flex items-start gap-2.5 pb-5 border-b ${isDarkMode ? "border-[#272B30]" : "border-[#E4E4E4]"}`} key={notification.id}>
                            <img src={notification.img} alt="notification img" className='max-w-[38px]' />
                            <div className={`max-w-[323px] `}>
                                <h2 className={`font-semibold text-sm mb-1 left-[22px] ${isDarkMode ? "text-[#EFEFEF]" : "text-[#11142D]"}`}>{notification.title}</h2>
                                <p className={`font-normal text-xs leading-[18px] mb-2 ${isDarkMode ? "text-[#6F767E]" : "text-[#808191]"}`}>{notification.description}</p>
                                <p className={`font-normal text-sm ${isDarkMode ? "text-[#EFEFEF]" : "text-[#11142D]"}`}>{notification.time}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {modal || notificationsListHandler ? (
                <div onClick={modalsClose} className={`fixed ${isDarkMode ? "dark:bg-[#111315CC]" : "bg-[#FCFCFCCC]"} z-40 top-0 left-0 w-full h-full  `}></div>
            ) : null}

            <div onClick={modalsClose} className={`${editProfile ? "block" : "hidden"} w-full h-full fixed bg-[#111315CC] top-0 z-50 left-0`}>
            </div>
            {/* NOT */}





            <div className={`${editProfile ? "scale-100" : "scale-0"} transition-all duration-300 bottom-0 fixed md:top-[50%] left-[50%] -translate-x-[50%] md:-translate-y-[50%] z-50 md:max-w-[500px] w-full  bg-[#1A1D1F]  px-5 py-[30px] md:rounded-2xl`}>
                <div className={`flex items-center justify-between ${isDarkMode ? "text-[#EFEFEF]" : "text-[#11142D]"}`}>
                    <h3 className={`font-semibold text-2xl  text-leading-6 mb-2.5`}>Latest Sales</h3>
                    <button onClick={modalsClose} className={`${isDarkMode ? "text-[#EFEFEF]" : "text-[#11142D]"}`}>
                        <svg width="28px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="24" height="24" fill="none" />
                            <path d="M7 17L16.8995 7.10051" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M7 7.00001L16.8995 16.8995" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-y-2.5 md:gap-y-4 mb-5">
                        {step === 1 && (
                            <>
                                <div className="w-full grid grid-cols-1 gap-y-[5px]">
                                    <label htmlFor="email" className="font-medium text-sm dark:text-[#EFEFEF] light:text-[#11142D]">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder="Enter your email"
                                        autoComplete="off"
                                        value={userEmail}
                                        onChange={(e) => setUserEmail(e.target.value)}
                                        className="p-3 bg-[#FCFCFC] bg-transparent font-normal text-base dark:text-[#EFEFEF] placeholder:dark:text-[#808191] light:text-[#11142D] outline-none placeholder:text-[#808191] placeholder:font-normal placeholder:text-base rounded-[10px] border dark:border-[#272B30] border-[#E4E4E4]"
                                    />
                                </div>
                                <div className="w-full grid grid-cols-1 gap-y-[5px]">
                                    <label htmlFor="password" className="font-medium text-sm dark:text-[#EFEFEF] light:text-[#11142D]">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="Password"
                                        value={userPassword}
                                        onChange={(e) => setUserPassword(e.target.value)}
                                        autoComplete="off"
                                        className="p-3 bg-[#FCFCFC] bg-transparent font-normal text-base dark:text-[#EFEFEF] placeholder:dark:text-[#808191] light:text-[#11142D] outline-none placeholder:text-[#808191] placeholder:font-normal placeholder:text-base rounded-[10px] border dark:border-[#272B30] border-[#E4E4E4]"
                                    />
                                </div>
                            </>
                        )}

                        {step === 2 && (
                            <>
                                <div className="w-full grid grid-cols-1 gap-y-[5px]">
                                    <label htmlFor="name" className="font-medium text-sm dark:text-[#EFEFEF] light:text-[#11142D]">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        placeholder="Enter your name"
                                        autoComplete="off"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="p-3 bg-[#FCFCFC] bg-transparent font-normal text-base dark:text-[#EFEFEF] placeholder:dark:text-[#808191] light:text-[#11142D] outline-none placeholder:text-[#808191] placeholder:font-normal placeholder:text-base rounded-[10px] border dark:border-[#272B30] border-[#E4E4E4]"
                                    />
                                </div>
                                <div className="w-full grid grid-cols-1 gap-y-[5px]">
                                    <label htmlFor="lastname" className="font-medium text-sm dark:text-[#EFEFEF] light:text-[#11142D]">
                                        Lastname
                                    </label>
                                    <input
                                        type="text"
                                        name="lastname"
                                        id="lastname"
                                        placeholder="Enter your lastname"
                                        autoComplete="off"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        className="p-3 bg-[#FCFCFC] bg-transparent font-normal text-base dark:text-[#EFEFEF] placeholder:dark:text-[#808191] light:text-[#11142D] outline-none placeholder:text-[#808191] placeholder:font-normal placeholder:text-base rounded-[10px] border dark:border-[#272B30] border-[#E4E4E4]"
                                    />
                                </div>
                            </>
                        )}
                        {error && (
                            <div className="text-red-500 text-sm mb-3">{error}</div>
                        )}
                        <div className="w-full flex justify-end gap-5 items-center">
                            <p className="font-medium text-sm max-md:text-right text-[#475BE8] cursor-pointer">
                                Forgot Password
                            </p>
                        </div>
                    </div>
                    <button type="submit" className="bg-[#475BE8] cursor-pointer w-full rounded-[10px] font-semibold text-base text-[#FCFCFC] mb-5 py-2.5 px-[102px] md:px-[114px]">
                        {step === 1 ? "Next" : "Submit"}
                    </button>
                </form>
            </div>
        </>
    );
}