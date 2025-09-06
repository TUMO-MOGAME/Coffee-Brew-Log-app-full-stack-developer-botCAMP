import {useTheme} from 'next-themes';
import type React from 'react';
import {Toaster as Sonner,toast} from 'sonner'

type toasterprops = React.ComponentProps<typeof Sonner>;

const toaster = ({...props}: toasterprops) => {
    const {theme = "system"} = useTheme();
    return(
        <Sonner 
            theme={theme as toasterprops['theme']}
            className="toaster group"
            toastOptions={{
                classNames: {
                    toast: "toast group-[.toaster]:toast",
                    description: "toast-description",
                },
            }}
            {...props}
        />
    )
}
export {toaster, toast}