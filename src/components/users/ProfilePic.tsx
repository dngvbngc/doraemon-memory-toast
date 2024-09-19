"use client";

import { useProfilePictureStore } from "@/app/lib/store";
import nobita from "@/assets/profiles/nobita.webp";
import shizuka from "@/assets/profiles/shizuka.webp";
import deki from "@/assets/profiles/deki.webp";
import suneo from "@/assets/profiles/suneo.webp";
import chaien from "@/assets/profiles/chaien.webp";
import Image from "next/image";
import { EditIcon, ViewIcon } from "@chakra-ui/icons";
import { Button, HStack } from "@chakra-ui/react";
import { useState } from "react";

export default function ProfilePic() {
  const { character, change } = useProfilePictureStore();
  const [isEditing, setIsEditing] = useState(false);

  const characters = ["nobita", "shizuka", "deki", "chaien", "suneo"];

  const handleCharacterChange = () => {
    const currentIndex = characters.indexOf(character);
    const nextIndex = (currentIndex + 1) % characters.length;
    change(characters[nextIndex]);
  };

  return (
    <>
      <Image
        style={{
          width: "18vw",
          height: "18vw",
          objectFit: "cover",
          marginLeft: "1vw",
          marginTop: "1vw",
          borderRadius: "18vw",
          transform: `scaleX(-1)`,
        }}
        src={
          character === "nobita"
            ? nobita
            : character === "shizuka"
            ? shizuka
            : character === "deki"
            ? deki
            : character === "chaien"
            ? chaien
            : character === "suneo"
            ? suneo
            : ""
        }
        alt={`${character} as profile photo`}
      />
      <HStack
        justifyContent='center'
        marginTop={5}
        position='fixed'
        bottom={5}
        right={5}
      >
        <Button
          display={isEditing ? "none" : "block"}
          onClick={() => setIsEditing(true)}
        >
          <EditIcon />
        </Button>
        <Button
          display={isEditing ? "block" : "none"}
          onClick={handleCharacterChange}
        >
          Change Profile Pic
        </Button>
        <Button
          display={isEditing ? "block" : "none"}
          onClick={() => setIsEditing(false)}
        >
          <ViewIcon />
        </Button>
      </HStack>
    </>
  );
}
