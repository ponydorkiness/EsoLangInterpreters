#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MEMORY_SIZE 3000
#define MAX_WORD_LENGTH 50
#define MAX_WORDS 10000

void fnr(FILE *inputFile) {
    int memorysize = MEMORY_SIZE;
    char memory[MEMORY_SIZE][MAX_WORD_LENGTH];
    char words[MAX_WORDS][MAX_WORD_LENGTH];
    int memorypointer = 0;
    int bm = 0;
    int i = 0;
    char *instructions[] = {"fnr", "bne", "peek", "poke", "ret", "inp"};
    int numWords = 0;
    char inputBuffer[1024]; // Buffer for user input
    int inputPos = 0; // Position in the input buffer
    int inputLength = 0; // Length of the current input

    // Fill memory array with '0'
    for (int j = 0; j < MEMORY_SIZE; j++) {
        memset(memory[j], '0', 1);
        memory[j][MAX_WORD_LENGTH - 1] = '\0'; // Null-terminate each string
    }

    // Read the file and split into words
    char line[1024];
    while (fgets(line, sizeof(line), inputFile)) {
        const char *delimiters = " \n/\\";
        char *token = strtok(line, delimiters);

        while (token != NULL && numWords < MAX_WORDS) {
            strncpy(words[numWords++], token, MAX_WORD_LENGTH - 1);
            token = strtok(NULL, delimiters);
        }
    }

    // Main loop to process instructions
    while (i < numWords) {
        if (strcmp(words[i], "fnr") == 0) {
            if (strcmp(memory[memorypointer], words[i + 1]) == 0) {
                strcpy(memory[memorypointer], "");
                int wordsearch = i + 2;
                while (1) {
                    int found = 0;
                    for (int j = 0; j < 6; j++) {
                        if (strcmp(words[wordsearch], instructions[j]) == 0) {
                            found = 1;
                            break;
                        }
                    }
                    if (found || words[wordsearch][0] == ':') {
                        break;
                    }
                    strcat(memory[memorypointer], words[wordsearch]);
                    strcat(memory[memorypointer], " ");
                    wordsearch++;
                }
                // Remove trailing whitespace
                memory[memorypointer][strlen(memory[memorypointer]) - 1] = '\0';
            }
        } else if (strcmp(words[i], "bne") == 0) {
            bm = i;
            if (strcmp(memory[memorypointer], words[i + 1]) != 0) {
                char label[MAX_WORD_LENGTH];
                snprintf(label, sizeof(label), ":%s", words[i + 2]);
                for (int k = 0; k < numWords; k++) {
                    if (strcmp(words[k], label) == 0) {
                        i = k;
                        break;
                    }
                }
            } else {
                i += 2;
            }
        } else if (strcmp(words[i], "peek") == 0) {
            printf("%s\n", memory[memorypointer]);
        } else if (strcmp(words[i], "poke") == 0) {
            memorypointer = atoi(words[i + 1]);
            i++;
        } else if (strcmp(words[i], "ret") == 0) {
            i = bm;
        }else if (strcmp(words[i], "inp") == 0) {
            char temp[256];  // Buffer to hold the input string

            // Read the whole line of input including spaces
            fgets(temp, sizeof(temp), stdin);

            // Remove the newline character at the end, if present
            size_t len = strlen(temp);
            if (len > 0 && temp[len - 1] == '\n') {
                temp[len - 1] = '\0';
            }

            // Store the input string in the memory cell
            strcpy(memory[memorypointer], temp);
        }
        i++;
    }
}

int main(int argc, char *argv[]) {
    if (argc < 2) {
        fprintf(stderr, "Usage: %s <filename>\n", argv[0]);
        return EXIT_FAILURE;
    }

    FILE *file = fopen(argv[1], "r");
    if (file == NULL) {
        perror("Failed to open file");
        return EXIT_FAILURE;
    }

    fnr(file);

    fclose(file);
    return EXIT_SUCCESS;
}
