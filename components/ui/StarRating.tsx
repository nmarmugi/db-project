'use client';

import { useState } from 'react';
import { Box, Icon } from '@chakra-ui/react';
import { FaStar } from 'react-icons/fa';

interface StarRating {
    count?: number;
    defaultValue: number;
    readOnly?: boolean;
    size: string;
}

export default function StarRating({
    count = 5,
    defaultValue,
    readOnly = true,
    size,
}: StarRating) {
    const [rating, setRating] = useState(defaultValue);

    return (
        <Box display="flex">
            {Array.from({ length: count }).map((_, index) => {
                const ratingValue = index + 1;
                return (
                    <Icon
                        as={FaStar}
                        key={index}
                        boxSize={size}
                        color={ratingValue <= rating ? 'yellow.400' : 'gray.300'}
                        cursor={readOnly ? 'default' : 'pointer'}
                        onClick={() => {
                            if (!readOnly) setRating(ratingValue);
                        }}
                    />
                );
            })}
        </Box>
    );
}
