
import { Link } from 'react-router-dom'

export default function NoProducts() {
    return (
        <div className='flex justify-center min-h-[20vh] items-center flex-col gap-1.5'>
            <p className='text-[16px] text-primary'>There are not products yet.</p>
            <Link to="/">
                <p className='text-[18px] bg-primary font-medium p-2 rounded-lg text-white'>
                    Add Your First Product To Favorite
                </p>
            </Link>
        </div>
    )
}
