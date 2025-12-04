import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
        translation: {
            home: 'Home',
            aboutUs: 'About Us',
            login: 'Login',
            signUp: 'Sign Up',
            language: 'Language',
            hero: {
                title1: 'Are You Ready To',
                title2: 'Get Standing?',
                description: 'Join The GetStanding Community And Take Charge Of Your Health. With Guided Movement Breaks, Smart Reminders, And Science-Backed Tips, We Make It Easier Than Ever To Sit Less And Live More. Ready To Stand Up For Your Wellbeing?',
                startButton: 'Start Your Journey',
                exploreButton: 'Explore Programs'
            },
            features: {
                title1: 'Our',
                title2: 'Features',
                subtitle: 'This Is A Preview Of What GetStanding Offers To Its Users. Find Out More By Clicking On Each Feature.',
                learnMore: 'Learn More →',
                items: [
                    {
                        title: 'Calorie tracker',
                        description: 'Monitor your daily calorie intake with our calorie tracking system making sure your macros are on track'
                    },
                    {
                        title: 'Desk adjustment system',
                        description: 'Track your time spent sitting and standing, helping you get some weight off that back.'
                    },
                    {
                        title: 'Friends',
                        description: 'Invite your friends to join you on this journey and motivate each other to continue.'
                    },
                    {
                        title: 'Rewards',
                        description: 'Every session counts, you can earn coins which can later allow you to upgrade to our pro plan and upgrade even more features'
                    },
                    {
                        title: 'Workout tracker',
                        description: 'Log exercises, track sets, monitor progression'
                    },
                    {
                        title: 'Visualize',
                        description: 'Monitor your progress with the help of graph created based on your performance.'
                    }
                ]
            },
            about: {
                title: 'About Us',
                paragraphs: [
                    'As a group of Software engineering students we realised an issue with how much of our day we spend sitting. This is not good for our health, and we wanted to figure out a way to fix this.',
                    "That's how the idea of Get Standing came to us. Its the perfect way to look out for our own wellbeing. We made a way that tracking your calorie intake, workouts and the amount of time you spend sitting more fun.",
                    'It is also much easier for the user to track, with our visualisers in place. We also think that a little bit of competition between friends is always good, so make sure you invite your friends to see how they are doing.',
                    'Being part of our movement also puts the user on a leaderboard where placing higher up will get you coins that you can later exchange into different rewards.'
                ]
            },
            contact: {
                title1: 'Get In',
                title2: 'Touch',
                description: "Have questions or want to learn more about Get Standing? We'd love to hear from you!",
                email: 'vibar24@student.sdu.dk',
                location: 'SDU Sønderborg'
            },
            loginPage: {
                heyThere: 'Hey There!',
                welcomeBack: 'Welcome Back.',
                subtext: 'Get back to tracking, monitoring and be proud of your progress!',
                noAccountQuestion: "Don't have an account?",
                signUpButton: 'Sign Up',
                title: 'Login',
                toAccount: 'To Your Account.',
                placeholders: {
                    username: 'Enter your username',
                    password: 'Enter your password'
                },
                button: 'Login',
                errors: {
                    loginFailed: 'Login failed',
                    networkError: 'Network error during login'
                }
            },
            signupPage: {
                heyThere: 'Hey There!',
                joinUs: 'Join Us.',
                subtext: 'Start tracking, monitoring and earn rewards by making progress!',
                alreadyHaveQuestion: 'Already have an account?',
                loginButton: 'Login',
                title: 'Sign Up',
                toAccount: 'Create Your Account.',
                placeholders: {
                    name: 'Enter your name',
                    email: 'Enter your email',
                    password: 'Create password',
                    repeatPassword: 'Repeat password'
                },
                checkboxLabel: 'I agree to terms and conditions',
                button: 'Sign Up',
                errors: {
                    required: 'Name, email and password are required',
                    passwordsMismatch: 'Passwords do not match',
                    termsRequired: 'You must agree to the terms',
                    registrationFailed: 'Registration failed'
                }
            },
            navbar: {
                title: 'NAVIGATION',
                dashboard: 'Dashboard',
                workout: 'Workout',
                meals: 'Meals',
                desk: 'Desk Details',
                hydration: 'Hydration',
                friends: 'Friends',
                settings: 'Settings'
            },
            dashboardPage: {
                todaysStats: "Today's stats",
                guest: 'Guest'
            },
            subscriptions: {
                title1: 'Join',
                title2: 'Today',
                subtitle: 'Checkout Our Subscription Options:',
                planIncludes: 'This plan includes:',
                currency: 'HUK',
                priceUnit: '/ Month',
                choosePlan: 'Choose Plan',
                plans: [
                    {
                        name: 'Beginner Plan',
                        features: [
                            'Notifications to adjust your desk',
                            'Manual desk adjustment',
                            'Logging up to 30 meals',
                            'Logging up to 50 workouts'
                        ]
                    },
                    {
                        name: 'Premium Plan',
                        features: [
                            'Unlimited workout logging',
                            'Unlimited meal tracking',
                            'Automatic desk adjustment',
                            'All of the Beginner Plan features and many more'
                        ]
                    }
                ]
            },
            logoutButton: {
                Logout: 'Logout'
            },
            deleteButton: {
                DeleteAccount: 'Delete Account',
                WarningMessage: 'Are you sure you want to delete your account? This action cannot be undone.'
            },
            deskGreeting: {
                hello: 'Hello,',
                manageDesk: 'Manage your desk.'
            },
            deskSettings: {
                title: 'Desk Settings',
                saveHeightLabel: 'Save Current Height As Preferred',
                confirmButton: 'confirm',
                prefSittingHeight: 'Preferred Sitting Height (Cm) - Manual',
                prefStandingHeight: 'Preferred Standing Height (cm)- Manual',
                positionStanding: 'Standing',
                positionSitting: 'Sitting'
            },
            foodStats: {
                mealslogged: 'Meals Logged',
                caloriesConsumed: 'Calories Consumed',
                avgIntake: "This Week's Average Intake"
            },
            calorieIntake: {
                calorieIntake: 'Calorie intake'
            },
            mealPicker: {
                searchBar: 'Search foods...',
                foodLibrary: 'Food Library',
                todayFood: "Today's Foods",
                noFoodAdded: 'No foods added yet.',
                totalCalories: 'Total Calories: ',
                noResults: 'No foods match '
            },
            foodPerformance: {
                nutritionOverview: 'Nutrition Overview',
                trackMeals: 'Track your meals and calorie intake',
                caloriesConsumed: 'Calories Consumed'
            },
            workoutStats: {
                totalWorkouts: 'Total Workouts',
                totalCalories: 'Calories Burned',
                thisWeek: 'This Week'
            },
            workoutPerformance: {
                performanceOverview: 'Performance Overview',
                trackWorkouts: 'Track your workouts and calories burned',
                caloriesBurned: 'Calories Burned'
            },
            exercises: {
                title: 'Exercises',
                searchExercise: 'Search exercises...',
                noResults: 'No exercises match',
                doneTitle: "Exercises Done"
            },
            muscleGroup: {
                title: 'Muscle Group Targeting',
                subtitle: 'Visual representation of muscle activation from your workout'
            }

        }
    },
    da: {
        translation: {
            home: 'Hjem',
            aboutUs: 'Om os',
            login: 'Log ind',
            signUp: 'Tilmeld',
            language: 'Sprog',
            hero: {
                title1: 'Er Du Klar Til At',
                title2: 'Stå Op?',
                description: 'Slut dig til GetStanding-fællesskabet og tag styringen over dit helbred. Med guidede bevægelsespause, smarte påmindelser og videnskabeligt underbyggede tips gør vi det nemmere end nogensinde at sidde mindre og leve mere. Klar til at stå op for dit velvære?',
                startButton: 'Start Din Rejse',
                exploreButton: 'Udforsk Programmer'
            }
            ,
            features: {
                title1: 'Vores',
                title2: 'Funktioner',
                subtitle: 'Dette er en forhåndsvisning af, hvad GetStanding tilbyder brugerne. Find ud af mere ved at klikke på hver funktion.',
                learnMore: 'Lær mere →',
                items: [
                    {
                        title: 'Kalorietræcker',
                        description: 'Overvåg dit daglige kalorieindtag med vores kalorietracker, så dine makroer er på rette spor'
                    },
                    {
                        title: 'Justerbart skrivebordssystem',
                        description: 'Hold styr på din siddetid og ståtid, så du aflaster ryggen.'
                    },
                    {

                    },
                    {
                        //keeping these to as a place holder so the layout isnt fucked
                    },

                    {
                        title: 'Træningssporer',
                        description: 'Log øvelser, registrer sæt og følg din progression.'
                    },
                    {
                        title: 'Visualisering',
                        description: 'Følg din fremgang med grafer baseret på din præstation.'
                    }
                ]
            },

            about: {
                title: 'Om os',
                paragraphs: [
                    'Som en gruppe softwareingeniørstuderende indså vi, hvor meget af vores dag vi tilbringer siddende. Dette er ikke godt for vores helbred, og vi ønskede at finde en måde at rette op på dette.',
                    'Det var sådan, ideen om Get Standing opstod for os. Det er den perfekte måde at passe på vores eget velvære. Vi har gjort det nemmere og sjovere at holde styr på kalorieindtag, træning og tid brugt siddende.',
                    'Det er også meget lettere for brugeren at holde styr på med vores visualiseringer. Vi mener også, at lidt konkurrence mellem venner er godt, så sørg for at invitere dine venner for at se, hvordan de klarer sig.',
                    'At være en del af vores bevægelse placerer også brugeren på en leaderboard, hvor højere placeringer giver mønter, som senere kan byttes til forskellige belønninger.'
                ]
            },
            contact: {
                title1: 'Kom i',
                title2: 'Kontakt',
                description: 'Har du spørgsmål eller vil du vide mere om Get Standing? Vi vil meget gerne høre fra dig!',
                email: 'vibar24@student.sdu.dk',
                location: 'SDU Sønderborg'
            },

            loginPage: {
                heyThere: 'Hej!',
                welcomeBack: 'Velkommen tilbage.',
                subtext: 'Kom tilbage til tracking, overvågning og vær stolt af din fremgang!',
                noAccountQuestion: 'Har du ikke en konto?',
                signUpButton: 'Tilmeld',
                title: 'Log ind',
                toAccount: 'Til din konto.',
                placeholders: {
                    username: 'Indtast dit brugernavn',
                    password: 'Indtast dit kodeord'
                },
                button: 'Log ind',
                errors: {
                    loginFailed: 'Log ind mislykkedes',
                    networkError: 'Netværksfejl under login'
                }
            },
            signupPage: {
                heyThere: 'Hej!',
                joinUs: 'Bliv medlem.',
                subtext: 'Begynd at tracke, overvåge og tjen belønninger ved at gøre fremskridt!',
                alreadyHaveQuestion: 'Har du allerede en konto?',
                loginButton: 'Log ind',
                title: 'Tilmeld',
                toAccount: 'Opret din konto.',
                placeholders: {
                    name: 'Indtast dit navn',
                    email: 'Indtast din e-mail',
                    password: 'Opret adgangskode',
                    repeatPassword: 'Gentag adgangskode'
                },
                checkboxLabel: 'Jeg accepterer vilkår og betingelser',
                button: 'Tilmeld',
                errors: {
                    required: 'Navn, e-mail og adgangskode er påkrævet',
                    passwordsMismatch: 'Adgangskoderne matcher ikke',
                    termsRequired: 'Du skal acceptere vilkårene',
                    registrationFailed: 'Registrering mislykkedes'
                }
            },
            navbar: {
                title: 'NAVIGATION',
                dashboard: 'Oversigt',
                workout: 'Træning',
                meals: 'Måltider',
                desk: 'Bordsdetaljer',
                hydration: 'Hydrering',
                friends: 'Venner',
                settings: 'Indstillinger'
            },
            dashboardPage: {
                todaysStats: 'Dagens statistik',
                guest: 'Gæst'
            },

            subscriptions: {
                title1: 'Tilmeld',
                title2: 'I dag',
                subtitle: 'Se vores abonnementsmuligheder:',
                planIncludes: 'Denne plan inkluderer:',
                currency: 'HUK',
                priceUnit: '/ Måned',
                choosePlan: 'Vælg plan',
                plans: [
                    {
                        name: 'Begynderplan',
                        features: [

                        ]
                    },
                    {
                        name: 'Premium-plan',
                        features: [

                        ]
                    }
                ]
            },
            logoutButton: {
                Logout: 'Log ud'
            },
            deleteButton: {
                DeleteAccount: 'Slet konto',
                WarningMessage: 'Er du sikker på, at du vil slette din konto? Denne handling kan ikke fortrydes.'
            },
            deskGreeting: {
                hello: 'Hej',
                manageDesk: 'Administrer dit skrivebord.'
            },
            deskSettings: {
                title: 'Skrivebordsindstillinger',
                saveHeightLabel: 'Gem nuværende højde som foretrukken',
                confirmButton: 'bekræfte',
                positionSitting: 'Siddende',
                positionStanding: 'Stående',
                prefSittingHeight: 'Foretrukken siddende højde (cm) - Manuel',
                prefStandingHeight: 'Foretrukken stående højde (cm) - Manuel'
            },
            foodStats: {
                mealslogged: 'Loggede måltider',
                caloriesConsumed: 'Indtagne kalorier',
                avgIntake: 'Denne uges gennemsnitlige indtag'
            },
            calorieIntake: {
                calorieIntake: 'Kalorieindtag'
            },
            mealPicker: {
                searchBar: 'Søg efter mad...',
                foodLibrary: 'Madbibliotek',
                todayFood: "Dagens mad",
                noFoodAdded: 'Ingen mad tilføjet endnu.',
                totalCalories: 'Samlede kalorier: ',
                noResults: 'Ingen mad matcher '
            },
            foodPerformance: {
                nutritionOverview: 'Ernæringsoversigt',
                trackMeals: 'Hold styr på dine måltider og kalorieindtag',
                caloriesConsumed: 'Indtagne kalorier'
            },
            workoutStats: {
                totalWorkouts: 'Samlede træninger',
                totalCalories: 'Forbrændte kalorier',
                thisWeek: 'Denne uge'
            },
            workoutPerformance: {
                performanceOverview: 'Præstationsoversigt',
                trackWorkouts: 'Hold styr på dine træninger og forbrændte kalorier',
                caloriesBurned: 'Forbrændte kalorier'
            },
            exercises: {
                title: 'Øvelser',
                searchExercise: 'Søg efter øvelser...',
                noResults: 'Ingen øvelser matcher',
                doneTitle: "Udførte øvelser"
            },
            muscleGroup: {
                title: 'Muskelgruppemålretning',
                subtitle: 'Visuel repræsentation af muskelaktivering fra din træning'
            }
        }
    }
};


const savedLang = typeof window !== 'undefined' ? localStorage.getItem('language') : null;

i18n.use(initReactI18next).init({
    resources,
    lng: savedLang ?? 'en',
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false
    }
});


if (typeof window !== 'undefined') {
    i18n.on('languageChanged', (lng) => {
        try {
            localStorage.setItem('language', lng);
        } catch (e) {
            console.error('Could not save language preference:', e);
        }
    });
}

export default i18n;