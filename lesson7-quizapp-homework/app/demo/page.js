// export default function Home() {
//     return (
//         <button className="bg-green-500 text-white px-4 py-2 hover:bg-green-700 rounded m-5 cursor-pointer focus:outline-2 focus:outline-offset-2 focus:outline-violet-500">Click me</button>
//     )
// }

// export default function Home() {
//     return (
//         <div className="max-w-sm mx-auto mt-10 bg-cyan-300 rounded-xl shadow-md shadow-green-500 hover:shadow-lg p-6">
//             <h2 className="text-xl font-bold mb-2">
//                 My Spec Card
//             </h2>
//             <p className="text-gray-600">
//                 This is my first TailWind.css file
//             </p>
//         </div>
//     )
// }

export default function Home() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
            <div className="bg-blue-100 p-4 rounded">Box 1</div>
            <div className="bg-blue-100 p-4 rounded">Box 2</div>
            <div className="bg-blue-100 p-4 rounded">Box 3</div>
        </div>
    )
}