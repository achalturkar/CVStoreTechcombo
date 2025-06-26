
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar= () =>{

    return(
        <nav className='flex flex-row justify-around items-center p-2 bg-blue-200 text-black '>

            <div className='font-bold text-lg'>
                <h1>CV Store</h1>
            </div>


            <ul className='flex flex-col lg:flex-row justify-center items-start gap-2 lg:gap-8 px-4 text-md font-semibold'>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/cvlist">CV List</Link></li>
                <li><Link to="/cvupload">CV Upload</Link></li>
                <li><Link to="/fileupload">Resume file Upload</Link></li>
                


            </ul>
        
        
        </nav>
    )

}

export default Navbar;