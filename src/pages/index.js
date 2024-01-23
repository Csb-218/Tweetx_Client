import Image from "next/image";
import { Inter } from "next/font/google";
import {Feed} from '../components/feed/Feed'
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <Feed/>
  );
}
