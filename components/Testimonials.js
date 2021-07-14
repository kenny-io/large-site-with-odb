import Image from "next/image";
import Link from "next/link";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Cassidy",
      message: "I love Hedges",
      description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae dolores
          deserunt ea doloremque natus error, rerum quas odio quaerat nam ex
          commodi hic, suscipit in a veritatis pariatur minus consequuntur!`,
      image:
        "https://res.cloudinary.com/netlify/image/upload/v1618208198/dxavi/cassidoo.jpg",
    },
    {
      name: "Jason",
      message: "It just works",
      description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae dolores
          deserunt ea doloremque natus error, rerum quas odio quaerat nam ex
          commodi hic, suscipit in a veritatis pariatur minus consequuntur!`,
      image:
        "https://res.cloudinary.com/netlify/image/upload/v1618208198/dxavi/jason.jpg",
    },
    {
      name: "Phil",
      message: "Look no further!",
      description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae dolores
          deserunt ea doloremque natus error, rerum quas odio quaerat nam ex
          commodi hic, suscipit in a veritatis pariatur minus consequuntur!`,
      image:
        "https://res.cloudinary.com/netlify/image/upload/v1618208199/dxavi/phil.jpg",
    },
  ];

  return (
    <div>
      <div className="flex my-20">
        <h1 className="max-w-md mx-auto text-3xl">Testimonials</h1>
      </div>
      <div className="">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.name}
            className="max-w-md mx-auto flex-1 py-4 px-8 bg-white shadow-lg rounded-lg my-20"
          >
            <div className="flex justify-center md:justify-end -mt-16">
              <Image
                className="w-20 h-20 object-cover rounded-full border-2 border-red-500"
                src={testimonial.image}
                height={100}
                width={100}
                alt={testimonial.name}
              />
            </div>
            <h2 className="text-gray-800 text-3xl font-semibold">
              {testimonial.message}
            </h2>
            <p className="mt-2 text-gray-600">{testimonial.description}</p>
            <div className="flex justify-end mt-4">
              <Link href="/">
                <a className="text-xl font-medium text-green-900">
                  {testimonial.name}
                </a>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
