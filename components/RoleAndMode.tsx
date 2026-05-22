import React from "react";
import { RoleToggle } from "./ui/role-toggle";
import { ModeToggle } from "./ui/mode-toggle";

export default function RoleAndMode() {
	return (
		<div className='hidden md:z-50 md:flex md:absolute md:top-4 md:right-4 '>
			<RoleToggle />
			<ModeToggle />
		</div>
	);
}
