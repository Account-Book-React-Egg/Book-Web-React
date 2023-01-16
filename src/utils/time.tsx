import dayjs, { type ConfigType } from 'dayjs';

export function format(time: ConfigType, format = 'YYYY-MM-DD HH:mm:ss') {
    return dayjs(time).format(format);
}
