import React from 'react'
import { render,  } from '@testing-library/react'
import { isServerSide } from '../pages/new/index'


test("should run on the server", async () => {
	expect(isServerSide()).toBe("NOT running on browser")
})