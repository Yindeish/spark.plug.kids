import Toast from 'react-native-root-toast';
import { View } from 'react-native';
import { Children, useRef } from 'react';
import { Text } from 'react-native-paper';

// Types
export enum Duration {
    LONG = 'long',
    SHORT = 'short'
}

export enum Type {
    DIALOG = 'dialog',
    TOOLTIP = 'tooltip'
}

export enum Direction {
    UP = 'up',
    DOWN = 'down'
}

interface Tooltip {
    type: Type.DIALOG | Type.TOOLTIP | string,
    message: string,
    duration: number,
    children?: JSX.Element
}

const ToolTip = ({ children, message, type = 'tooltip', duration }: Partial<Tooltip>) => {
    
    let index: number = 10;
    const topTooltip = useRef<View | null>(null);
    const backOverlay = useRef<View | null>(null);
    // const backOverlay = useRef<View | null>(null);

    const fade = (tooltip, duration) => {
        const inDown = (tooltip) => {
            tooltip.setNativeProps({
            style: {
                opacity: 0,
                transform: `translateY(-20px)`,
            },
            });
            setTimeout(() => {
                tooltip.setNativeProps({
                style: {
                    opacity: 1,
                        transform: 'translateY(0)',
                },
                });
            }, (duration * 1000) / 4);
        }
        const outUp = (tooltip) => {
              tooltip.setNativeProps({
                style: {
                    opacity: 1,
                    transform: 'translateY(0)',
                },
                });
            setTimeout(() => {
                tooltip.setNativeProps({
                style: {
                    opacity: 0,
                    transform: `translateY(-20px)`,
                },
            });
            }, (duration * 1000) / 4);
        }

        inDown(tooltip);
        setTimeout(() => {
            outUp(tooltip);
        }, duration * 1000);
    }

    if (topTooltip.current) {
        fade(topTooltip.current, 2)
    };
        
    return (
      <>
            {type == Type.TOOLTIP && <View ref={topTooltip} style={{ position: 'absolute', top: '0%', left: '5%', zIndex: index++, width: '90%', height: 'auto', padding: 13, backgroundColor: 'white', borderRadius: 10, shadowColor: 'grey', opacity: 0 }}><Text style={{color: 'green', fontWeight: '700'}}>{message}</Text></View>}
            
            {type == Type.DIALOG && <View ref={backOverlay}><View style={{ position: 'absolute', top: '35%', left: '10%', zIndex: index++, width: '80%', height: 'auto',padding: 18, backgroundColor: 'white', borderRadius: 10, shadowColor: 'grey' }}><Text>{message}</Text></View></View>}

      </>
  )
}

export default ToolTip;