/**
 * Script to remove tags from all variant components
 * This modifies the index.ts files in all variant folders to remove the tags array
 */

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

// Base paths for the three category variants
const BASE_PATHS = [
  'src/components/review/question-view-variants',
  'src/components/review/set-view-variants',
  'src/components/review/timeline-view-variants'
];

/**
 * Gets all variant directories within a base path
 */
function getVariantDirs(basePath) {
  if (!fs.existsSync(basePath)) {
    console.warn(`Warning: Path does not exist: ${basePath}`);
    return [];
  }

  return fs.readdirSync(basePath)
    .filter(name => {
      const fullPath = path.join(basePath, name);
      return fs.statSync(fullPath).isDirectory() && name.startsWith('variant-');
    })
    .map(name => path.join(basePath, name));
}

/**
 * Removes tags from a variant's index.ts file
 */
async function removeTagsFromVariant(variantDir) {
  const indexPath = path.join(variantDir, 'index.ts');
  
  if (!fs.existsSync(indexPath)) {
    console.warn(`Warning: No index.ts found in ${variantDir}`);
    return false;
  }

  try {
    let content = await readFileAsync(indexPath, 'utf8');
    
    // Check if file has tags
    if (!content.includes('tags:')) {
      console.log(`No tags found in ${indexPath}`);
      return false;
    }

    // Using regex to remove the tags property
    const tagsRegex = /,?\s*tags:\s*\[[^\]]*\]/;
    const updatedContent = content.replace(tagsRegex, '');
    
    // Save the file
    await writeFileAsync(indexPath, updatedContent);
    console.log(`Removed tags from ${indexPath}`);
    return true;
  } catch (error) {
    console.error(`Error processing ${indexPath}:`, error);
    return false;
  }
}

/**
 * Main function to process all variants
 */
async function main() {
  let totalProcessed = 0;
  let totalModified = 0;

  // Process each base path
  for (const basePath of BASE_PATHS) {
    const variantDirs = getVariantDirs(basePath);
    
    console.log(`Found ${variantDirs.length} variants in ${basePath}`);
    
    // Process each variant directory
    for (const variantDir of variantDirs) {
      totalProcessed++;
      const wasModified = await removeTagsFromVariant(variantDir);
      if (wasModified) totalModified++;
    }
  }

  console.log(`\nRemoved tags from ${totalModified} of ${totalProcessed} variants`);
}

main().catch(console.error);
