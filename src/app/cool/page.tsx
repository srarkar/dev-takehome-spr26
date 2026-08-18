import dunkGif from '../assets/dunk.gif';
import Image from 'next/image';

export default function Kewl() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-primary text-white gap-5">
      {/* 
      Write something unique about you here! 
      It could be a club you're part of, a weird skill you have, or something special that happened to you.
      Feel free to put links, images, whatever! 
      Don't worry about styling- we aren't grading you on this- it's just to get to know you better! :) 
      */}
	<p style={{ marginInline: '10px' }}>
	Hi! My name's Rick, and I'm an incoming fourth year CS major. 
	One of the best things that's happened to me during my time at GT was joining CS2110 as a TA. <br />
	I've met a lot of great people and it made my time as a student feel special.
	</p>
	<Image src={dunkGif} alt="" />
    </div>
  );
}
