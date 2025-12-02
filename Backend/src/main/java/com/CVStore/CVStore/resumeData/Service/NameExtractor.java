package com.CVStore.CVStore.resumeData.Service;


import org.springframework.stereotype.Service;

import java.util.*;
import java.util.regex.*;

public class NameExtractor {

    private static final Pattern EMAIL_PATTERN =
            Pattern.compile("[A-Za-z0-9+_.-]+@(.+)$");
    private static final Pattern PHONE_PATTERN =
            Pattern.compile("\\+?\\d[\\d\\s().-]{7,}");
    private static final Pattern LOCATION_PATTERN =
            Pattern.compile("(street|st\\.|road|rd\\.|city|india|usa|uk|ca|avenue|ave\\.|zip|postal)", Pattern.CASE_INSENSITIVE);
    private static final Pattern JOB_TITLE_PATTERN =
            Pattern.compile("(engineer|developer|manager|director|consultant|analyst|specialist|lead|designer|architect)",
                    Pattern.CASE_INSENSITIVE);
    private static final Pattern SECTION_HEADER_PATTERN =
            Pattern.compile("(summary|experience|education|projects|skills|objective|profile)",
                    Pattern.CASE_INSENSITIVE);

    public static String extractName(String text) {
        String[] lines = text.split("\\r?\\n");

        List<LineScore> scoredLines = new ArrayList<>();

        for (int i = 0; i < lines.length; i++) {
            String line = lines[i].trim();

            if (line.isEmpty()) continue;
            if (line.length() < 3 || line.length() > 60) continue;

            // skip obvious noise
            if (EMAIL_PATTERN.matcher(line).find()) continue;
            if (PHONE_PATTERN.matcher(line).find()) continue;
            if (SECTION_HEADER_PATTERN.matcher(line).find()) continue;

            // Skip lines with too many symbols
            if (line.matches(".*[{}<>\\[\\]$%#@*&_=+\\/\\\\].*")) continue;

            double score = scoreLine(line, i);
            if (score > 0) {
                scoredLines.add(new LineScore(line, score));
            }
        }

        // Sort by score descending
        scoredLines.sort((a, b) -> Double.compare(b.score, a.score));

        return scoredLines.isEmpty() ? null : scoredLines.get(0).line;
    }

    private static double scoreLine(String line, int index) {
        double score = 0;

        String[] words = line.split("\\s+");

        // Name-like word count
        if (words.length >= 2 && words.length <= 4) score += 2;
        else score -= 2;

        // Capitalization pattern
        int properCaps = 0;
        for (String w : words) {
            if (w.matches("[A-Z][a-zA-Z.'’-]*")) properCaps++;
        }
        score += properCaps * 1.5;

        // Penalty for lowercase-first words
        if (properCaps < words.length) score -= 1;

        // Penalty for job titles
        if (JOB_TITLE_PATTERN.matcher(line).find()) score -= 5;

        // Penalty for locations
        if (LOCATION_PATTERN.matcher(line).find()) score -= 4;

        // Alphabetic ratio
        long alphaCount = line.chars().filter(Character::isLetter).count();
        double alphaRatio = (double) alphaCount / line.length();
        if (alphaRatio > 0.7) score += 1.5;
        else score -= 1;

        // Position weight (top lines more likely)
        score += Math.max(10 - index, 0);

        return score;
    }

    private static class LineScore {
        String line;
        double score;
        LineScore(String l, double s) { line = l; score = s; }
    }

}
