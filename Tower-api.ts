/**
 * sc-1123 专用图形块
 */
//% color = #1DE9EA weight = 96 icon = "✐"
namespace sc1123 {
    export enum Servos {
        S1 = 0x01,
        S2 = 0x02,
        S3 = 0x03,
        S4 = 0x04,
        S5 = 0x05,
        S6 = 0x06,
        S7 = 0x07,
        S8 = 0x08
    }

    export enum Motors {
        M1A = 0x1,
        M1B = 0x2,
        M2A = 0x3,
        M2B = 0x4
    }

    /**
     * 侦测敌军
     * @param trig
     * @param echo
     */
    //% blockId=sc1123_detectenemy block="侦测敌军 trig %trig|echo %echo"
    export function detectenemy(trig = DigitalPin.P0, echo = DigitalPin.P1) : boolean {
        return EALAB.Ultrasonic(trig, echo, EALAB.PingUnit.cm) > 15;
    }

    /**
     * 巡线
     * @param s1
     * @param s2
     */
    //% blockId=sc1123_detectroad block="巡线 s1 %s1|s2 %s2"
    export function detectroad(s1 = DigitalPin.P0, s2 = DigitalPin.P1): number {
        let detectleft = pins.digitalReadPin(s1) == 1;
        let detectright = pins.digitalReadPin(s2) == 1;
        if (!detectleft && detectright) {
            return 1;
        } else if (detectleft && !detectright){
            return 2;
        } else if (detectleft && detectright) {
            return 3;
        } else {
            return 4;
        }
    }

    /**
     * 开火
     * @param pin
     */
    //% blockId=sc1123_fire block="开火 引脚 %pin"
    export function fire(pin = DigitalPin.P0): void {
        pins.digitalWritePin(pin, 1);
    }

    /**
     * 炮台转向
     * @param pin
     * @param angle
     */
    //% blockId=sc1123_steergun block="炮台转向 引脚 %pin"
    export function steergun(pin: Servos, angle: number): void{
        EALAB.Servo(pin, angle);
    }

    /**
     * 前进
     * @param speed
     */
    //% blockId=sc1123_forward block="前进"
    export function forward(speed = 255): void{
        EALAB.MotorRun(Motors.M1A, speed);
        EALAB.MotorRun(Motors.M1B, speed);
        EALAB.MotorRun(Motors.M2A, speed);
        EALAB.MotorRun(Motors.M2B, speed);
    }

    /**
     * 后退
     * @param speed
     */
    //% blockId=sc1123_backward block="后退"
    export function backward(speed = 255): void{
        EALAB.MotorRun(Motors.M1A, -speed);
        EALAB.MotorRun(Motors.M1B, -speed);
        EALAB.MotorRun(Motors.M2A, -speed);
        EALAB.MotorRun(Motors.M2B, -speed);
    }

    /**
     * 左转
     * @param speed
     */
    //% blockId=sc1123_left block="左转"
    export function left(speed = 255): void{
        EALAB.MotorRun(Motors.M1A, -speed);
        EALAB.MotorRun(Motors.M1B, -speed);
        EALAB.MotorRun(Motors.M2A, speed);
        EALAB.MotorRun(Motors.M2B, speed);
    }

    /**
     * 右转
     * @param speed
     */
    //% blockId=sc1123_right block="右转"
    export function right(speed = 255): void{
        EALAB.MotorRun(Motors.M1A, speed);
        EALAB.MotorRun(Motors.M1B, speed);
        EALAB.MotorRun(Motors.M2A, -speed);
        EALAB.MotorRun(Motors.M2B, -speed);
    }
}
