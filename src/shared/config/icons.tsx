'use client';

import { GiAries, GiTaurus, GiGemini, GiCancer, GiLeo, GiVirgo, GiLibra, GiScorpio, GiSagittarius, GiCapricorn, GiAquarius, GiPisces, GiRooster, GiMonkey, GiGoat, GiSandSnake, GiRabbit, GiTigerHead, GiBuffaloHead } from 'react-icons/gi';
import { FaDragon, FaHorse, FaDog, FaPiggyBank, FaCat} from 'react-icons/fa6';
import { Rat } from 'lucide-react';

const HOROSCOPE_ICONS: { [key: string]: React.ComponentType<any> } = {
    aries: GiAries,
    ram: GiAries,
    taurus: GiTaurus,
    bull: GiTaurus,
    gemini: GiGemini,
    twins: GiGemini,
    crab: GiCancer,
    leo: GiLeo,
    lion: GiLeo,
    virgo: GiVirgo,
    virgin: GiVirgo,
    libra: GiLibra,
    balance: GiLibra,
    scorpio: GiScorpio,
    scorpion: GiScorpio,
    scorpius: GiScorpio,
    sagittarius: GiSagittarius,
    archer: GiSagittarius,
    capricorn: GiCapricorn,
    capricornus: GiCapricorn,
    goat: GiCapricorn,
    aquarius: GiAquarius,
    pisces: GiPisces,
    fish: GiPisces,
}

const CHINESE_ZODIAC_ICONS: { [key: string]: React.ComponentType<any> } = {
    boar: FaPiggyBank,
    pig: FaPiggyBank,
    pork: FaPiggyBank,
    dog: FaDog,
    rooster: GiRooster,
    monkey: GiMonkey,
    goat: GiGoat,
    horse: FaHorse,
    snake: GiSandSnake,
    dragon: FaDragon,
    rabbit: GiRabbit,
    tiger: GiTigerHead,
    cat: FaCat,
    ox: GiBuffaloHead,
    bull: GiBuffaloHead,
    rat: Rat
}

export const getHoroscopeIcon = (sign?: string | null): React.ComponentType<any> | null => {
    if(!sign) return null;
    return HOROSCOPE_ICONS[sign.toLowerCase()] || null;
}

export const getChineseZodiacIcon = (sign?: string | null): React.ComponentType<any> | null => {
    if(!sign) return null;
    return CHINESE_ZODIAC_ICONS[sign.toLowerCase()] || null;
}