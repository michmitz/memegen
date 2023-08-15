import Image from 'next/image'
import React from 'react';
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [imageURL, setImageURL] = React.useState<string>('');
  const [error, setShowError] = React.useState<boolean>(false);


  const handleClick = async (e: any) => {
    setShowError(false);

    const response = await fetch("/api/openai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (data) {
      console.log("data", data)
      setImageURL(data.response)
    } else {
      setShowError(true);
    }
  };
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">


    <>
    <button onClick={handleClick}>Click to display image</button>

    {imageURL && <Image src={imageURL} alt={''} width={512} height={512} />
    }
  {error && <p>{error}</p>}
  </>


      </div>
    </main>
  )
}
