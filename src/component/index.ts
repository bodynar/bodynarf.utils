import { Optional } from "..";

/**
 * Build react element classname value from different values
 * @param partialNames Array of possible class names
 * @returns Classname attribute value
 */
export const getClassName = (partialNames: Array<Optional<string>>): string => {
    return partialNames
        .withoutEmpty(true)
        .withoutDuplicate()
        .join(" ")
        ;
};
