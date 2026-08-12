INSERT INTO users (name, email, role, created_at) VALUES
('Ava Walker', 'ava.walker@example.com', 'Product Manager', NOW()),
('Lucas Martin', 'lucas.martin@example.com', 'Developer', NOW() - INTERVAL '8 days'),
('Mia Patel', 'mia.patel@example.com', 'Designer', NOW() - INTERVAL '5 days'),
('Ethan Reed', 'ethan.reed@example.com', 'QA Engineer', NOW() - INTERVAL '12 days'),
('Sofia Kim', 'sofia.kim@example.com', 'Operations', NOW() - INTERVAL '15 days');

INSERT INTO tasks (title, description, status, priority, assigned_to, due_date, created_at, updated_at) VALUES
('Launch Q4 marketing sprint', 'Plan the marketing campaign and update the task board.', 'In Progress', 'High', 1, NOW()::date + INTERVAL '5 days', NOW() - INTERVAL '6 days', NOW() - INTERVAL '3 days'),
('Review design handoff', 'Review the final design comps and share feedback with the design team.', 'Pending', 'Medium', 3, NOW()::date + INTERVAL '3 days', NOW() - INTERVAL '4 days', NOW() - INTERVAL '4 days'),
('Fix checkout bug', 'Investigate the payment error on mobile checkout.', 'Blocked', 'Urgent', 2, NOW()::date - INTERVAL '2 days', NOW() - INTERVAL '8 days', NOW() - INTERVAL '1 days'),
('Prepare sprint report', 'Compile progress and metrics for leadership review.', 'Completed', 'Low', 5, NOW()::date - INTERVAL '1 days', NOW() - INTERVAL '10 days', NOW() - INTERVAL '2 days'),
('Update onboarding flow', 'Add new tour screens and messaging for first-time users.', 'In Progress', 'High', 2, NOW()::date + INTERVAL '7 days', NOW() - INTERVAL '2 days', NOW() - INTERVAL '1 day'),
('QA regression tests', 'Run regression suite for latest release candidate.', 'Pending', 'Medium', 4, NOW()::date + INTERVAL '2 days', NOW() - INTERVAL '3 days', NOW() - INTERVAL '3 days'),
('Customer support audit', 'Summarize current support tickets and highlight repeat issues.', 'Pending', 'Low', 5, NOW()::date + INTERVAL '10 days', NOW() - INTERVAL '5 days', NOW() - INTERVAL '4 days'),
('Deploy new API endpoint', 'Launch endpoint for external team integration.', 'Completed', 'High', 2, NOW()::date - INTERVAL '7 days', NOW() - INTERVAL '12 days', NOW() - INTERVAL '6 days'),
('Plan team offsite', 'Finalize logistics and agenda for the offsite meeting.', 'In Progress', 'Medium', 1, NOW()::date + INTERVAL '12 days', NOW() - INTERVAL '7 days', NOW() - INTERVAL '2 days'),
('Write user help docs', 'Create documentation for the new features released this quarter.', 'Pending', 'Low', 3, NOW()::date + INTERVAL '14 days', NOW() - INTERVAL '9 days', NOW() - INTERVAL '9 days');

INSERT INTO comments (task_id, user_id, comment, created_at) VALUES
(1, 2, 'I am checking the campaign components now.', NOW() - INTERVAL '4 days'),
(1, 1, 'Please prioritize the homepage banner first.', NOW() - INTERVAL '3 days'),
(3, 2, 'The checkout bug is only happening for saved cards.', NOW() - INTERVAL '2 days'),
(3, 4, 'Blocked until backend can confirm payment logs.', NOW() - INTERVAL '1 day'),
(5, 2, 'I updated the new onboarding copy based on the review.', NOW() - INTERVAL '1 day'),
(9, 1, 'Draft agenda looks good; I will share with the team.', NOW() - INTERVAL '2 days');
