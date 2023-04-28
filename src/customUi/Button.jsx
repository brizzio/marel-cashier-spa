import React, { forwardRef }  from 'react'

const classes = {
    base: 'focus:outline-none transition ease-in-out duration-300',
    disabled: 'opacity-50 cursor-not-allowed',
    pill: 'rounded-full',
    size: {
        small: 'px-2 py-2 text-xs',
        normal: 'px-4 py-2',
        large: 'px-8 py-3 text-lg'
    },
    variant: {
        primary: 'bg-white hover:bg-[#336770] text-[#051619] rounded-md border-slate-200 shadow-md hover:text-white border border-[#051619] hover:border-transparent rounded',
        secondary: 'bg-gray-200 hover:bg-gray-800 focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 text-gray-900 hover:text-white',
        danger: 'bg-red-500 hover:bg-red-800 focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 text-white',
        main:'bg-transparent hover:bg-[#051619] text-[#051619]  hover:text-white py-2 px-4 border border-[#051619] hover:border-transparent rounded'
    }
}

const cls = (input) =>
    input
        .replace(/\s+/gm, " ")
        .split(" ")
        .filter((cond) => typeof cond === "string")
        .join(" ")
        .trim();

const Button = forwardRef(
    (
        {
            children,
            type = 'button',
            className,
            variant = 'primary',
            size = 'normal',
            pill,
            disabled = false,
            onClick,
            ...props
        }, ref
    ) => (
        <button
            ref={ref}
            disabled={disabled}
            type={type}
            onClick = {onClick}
            className={cls(`
                ${classes.base}
                ${classes.size[size]}
                ${classes.variant[variant]}
                ${pill && classes.pill}
                ${disabled && classes.disabled}
                ${className}
            `)}
            {...props}
        >
            {children}
        </button>
    ));

export default Button