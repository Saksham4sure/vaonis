import { about, social, support, technology } from '../constants';

const Footer = () => {
    return (
        <div className=' w-[100vw] pt-20 pb-10 px-10'>
            <div className='flex items-center justify-center lg:mx-[10vw] py-10 border-t border-b border-stone-300'>
                <svg viewBox="0 0 147 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-[146px] ipad:w-[175px] h-auto">
                    <g clip-path="url(#clip0_121_6334)">
                        <path d="M39.0489 17.696C36.9182 17.696 35.151 16.9601 33.639 15.4498C32.1347 13.928 31.4077 12.1479 31.4077 10.0019C31.4077 7.8559 32.1347 6.0759 33.639 4.55404C35.151 3.03988 36.9221 2.30399 39.0489 2.30399C41.1758 2.30399 42.9469 3.03988 44.4589 4.55018C45.9631 6.07205 46.6901 7.8559 46.6901 9.99807C46.6901 12.1402 45.9631 13.9241 44.4589 15.446C42.9469 16.9563 41.1758 17.6922 39.0489 17.6922M46.083 2.92814C44.1534 0.98247 41.7906 0 39.0644 0C36.3382 0 33.9793 0.986322 32.0458 2.92814C30.1162 4.87382 29.1339 7.25101 29.1223 9.99807C29.1223 12.7451 30.1007 15.1223 32.0342 17.068C33.9638 19.0137 36.3227 19.9961 39.0528 19.9961C41.7829 19.9961 44.1418 19.0098 46.0714 17.068C46.3189 16.8253 46.547 16.571 46.7636 16.309L46.7752 19.7496H48.9987L48.9832 9.99422C48.991 7.24716 48.0165 4.86997 46.0869 2.92429" fill="black"></path>
                        <path d="M105.89 3.23252C104.169 1.27528 102.066 0.281256 99.6293 0.281256C97.1931 0.281256 95.1049 1.27143 93.388 3.22096C91.6826 5.15122 90.8009 7.51686 90.7661 10.2447V19.8189H93.0167V10.2524C93.0477 8.16028 93.7167 6.35716 95.0005 4.89308C96.2959 3.42901 97.8079 2.71624 99.6177 2.71624C101.427 2.71624 102.955 3.43286 104.266 4.90464C105.557 6.37642 106.219 8.18339 106.234 10.2716L106.25 19.8189H108.496L108.485 10.2678C108.465 7.53227 107.591 5.16663 105.89 3.23637" fill="black"></path>
                        <path d="M121.768 0.296667H119.463V19.7804H121.768V0.296667Z" fill="black"></path>
                        <path d="M12.8346 19.765L23.0666 0.242728H20.3095L11.5082 17.0757L2.67983 0.242728H0L10.1779 19.765H12.8346Z" fill="black"></path>
                        <path d="M135.117 19.7842H141.594C144.572 19.7842 146.996 17.3454 146.996 14.3441C146.996 11.3427 144.572 8.90387 141.594 8.90387H139.274C137.553 8.90387 136.153 7.49374 136.153 5.75997C136.153 4.0262 137.553 2.61607 139.274 2.61607H144.003V0.319784H139.274C136.296 0.319784 133.875 2.75862 133.875 5.75997C133.875 8.76132 136.296 11.2002 139.274 11.2002H141.594C143.315 11.2002 144.715 12.6103 144.715 14.3441C144.715 16.0778 143.311 17.4841 141.594 17.4841H135.117V19.7842Z" fill="black"></path>
                        <path d="M69.8719 17.696C67.745 17.696 65.9739 16.9601 64.4658 15.4498C62.9615 13.928 62.2307 12.1479 62.2307 10.0019C62.2307 7.8559 62.9615 6.0759 64.4619 4.55404C65.9739 3.03988 67.745 2.30399 69.8719 2.30399C71.9987 2.30399 73.7698 3.03988 75.2818 4.55018C76.786 6.07205 77.5169 7.8559 77.5169 9.99807C77.5169 12.1402 76.786 13.9241 75.2818 15.446C73.7698 16.9563 71.9987 17.6922 69.8719 17.6922M69.8835 0C67.1572 0 64.7984 0.986322 62.8649 2.932C60.9352 4.87767 59.953 7.25101 59.9414 10.0019C59.9414 12.749 60.9236 15.1262 62.8533 17.0719C64.7829 19.0175 67.1456 20.0039 69.8719 20.0039C72.5981 20.0039 74.9608 19.0175 76.8905 17.0719C78.824 15.1262 79.8023 12.7451 79.8023 10.0019C79.81 7.25486 78.8356 4.87767 76.9021 2.932C74.9763 0.986322 72.6097 0 69.8835 0Z" fill="#00A6E0"></path>
                    </g>
                    <defs>
                        <clipPath id="clip0_121_6334">
                            <rect width="147" height="20" fill="white"></rect>
                        </clipPath>
                    </defs>
                </svg>
            </div>
            <div className='py-10 flex flex-col lg:flex-row gap-10 lg:mx-[10vw]'>
                <div className='flex flex-col items-center text-center lg:text-start lg:items-start lg:w-[20vw] '>
                    <h1 className='text-xl mb-3'>Explore the Universe with Vaonis</h1>
                    <p className='text-sm text-stone-400 mb-4'>Subscribe to the Vaonis newsletter and be the first to receive the latest news, exclusive offers, and expert insights on stargazing and astrophotography.</p>
                    <p className='py-2 px-5 rounded-full bg-[#36A6E2] cursor-pointer'>Sign me up</p>
                </div>
                <div className='flex flex-col text-sm gap-2'>
                    <p className='text-stone-400 pb-4'>Social</p>
                    {
                        social.map(({text}, index) => (
                            <p className='cursor-pointer' key={index}>{text}</p>
                        ))
                    }
                </div>
                <div className='flex flex-col text-sm gap-2'>
                    <p className='text-stone-400 pb-4'>Support</p>
                    {
                        support.map(({sup}, index) => (
                            <p className='cursor-pointer' key={index}>{sup}</p>
                        ))
                    }
                </div>
                <div className='flex flex-col text-sm gap-2'>
                    <p className='text-stone-400 pb-4'>Support</p>
                    {
                        technology.map(({text}, index) => (
                            <p className='cursor-pointer' key={index}>{text}</p>
                        ))
                    }
                </div>
                <div className='flex flex-col text-sm gap-2'>
                    <p className='text-stone-400 pb-4'>Support</p>
                    {
                        about.map(({text}, index) => (
                            <p className='cursor-pointer' key={index}>{text}</p>
                        ))
                    }
                </div>
            </div>
            <div className='h-[1px] bg-stone-400 flex lg:mx-[10vw]'></div>
            <div className='flex justify-center lg:justify-end lg:mx-[10vw] pt-5'>
                <p className='text-[11px] cursor-default text-stone-500'>made by saksham</p>
            </div>
        </div>
    )
}

export default Footer
