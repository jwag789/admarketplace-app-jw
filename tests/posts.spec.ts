import { test, expect } from '@playwright/test'
 
test('should navigate to a post page from home page', async ({ page }) => {
  await page.goto('http://localhost:3000')
  await page.locator('select').selectOption('qui est esse');
  await expect(page).toHaveURL('http://localhost:3000/posts/2')
  await expect(page.locator('h3')).toContainText('est rerum tempore vitae sequi sint nihil reprehenderit dolor beatae ea dolores neque fugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis qui aperiam non debitis possimus qui neque nisi nulla')
})

test('should navigate to the home page from an error page', async ({ page }) => {
  await page.goto('http://localhost:3000/error')
  await page.click('text=Home')
  await expect(page).toHaveURL('http://localhost:3000')
  await expect(page.locator('select')).toContainText('Select a Post')
})

test('should show an error for a post that does not exist', async ({ page }) => {
  await page.goto('http://localhost:3000/posts/error')
  await expect(page.locator('h4')).toContainText('Invalid post id: error')
})

test('should show an error page for a path that does not exist', async ({ page }) => {
  await page.goto('http://localhost:3000/error')
  await expect(page.locator('h1')).toContainText('Page not found: 404')
})